<script lang="ts">
    import { xClass } from '$lib/objects/xClass';
    import { classes } from '$lib/stores/classes';
    import { focus } from '$lib/stores/focus'
    import { xAssociation } from '$lib/objects/xAssociation';
    import { associations } from "$lib/stores/associations";
    import DataField from './dataField.svelte'
    
    export let s: xClass;
    let xtitle: SVGGraphicsElement
    let titleEditorBbox: DOMRect

    let moving = false;
    $: titleEdit = false;
    
	function onMouseDown() {
		moving = true;
	}
	
	function onMouseMove(e: MouseEvent) {
		if (moving) {
			s.x += e.movementX;
			s.y += e.movementY;
            classes.replace(s.getId(), s)
		}
	}
	
	function onMouseUp() {
		moving = false;
	}

    function setfocus() {
        if($focus != "0" && s.getId() != $focus){
            let newAssociation = new xAssociation($focus, s.getId());
            associations.add(newAssociation);
        }
        focus.set(s.getId())
    }
    function unfocus(){
        focus.set('0')

        if(titleEdit){
            classes.replace(s.getId(),s)
        }
        titleEdit = false
    }

    function titleDblClick(){
        titleEditorBbox = xtitle.getBBox();
        titleEdit = true;
    }

</script>


<!-- svelte-ignore a11y-no-static-element-interactions -->
<!-- svelte-ignore a11y-click-events-have-key-events -->

<svg x={s.x} y={s.y} width={s.getWidth()+4} height={s.getHeight() +4} on:click|stopPropagation={setfocus}>
    <rect x={2} y={2} width={s.getWidth()} height={s.getHeight()} on:mousedown={onMouseDown}  stroke={$focus == s.getId() ? "mediumslateblue": "black"} stroke-width="2" fill={$focus == s.getId() ? "silver": "ghostwhite"} rx="10" ry="10" class=" hover:cursor-move" />
    
    <g on:dblclick|stopPropagation={titleDblClick} bind:this={xtitle}>
        <text x={s.getWidth()/2} y={20} text-anchor="middle" font-size="16" font-weight="bold">{s.name}</text>
    </g>
    
    <line x1={2} y1={24} x2={s.getWidth()+2} y2={24} stroke="black" stroke-width="2" />
    
    <DataField startY={40} s={s} data={s.attributes}/>
    
    <line x1={2} y1={(2+s.getAttributeLines())*16} x2={s.getWidth()+2} y2={(2+s.getAttributeLines())*16} stroke="black" stroke-width="2" />

    <DataField startY={(3+s.getAttributeLines())*16} s={s} data={s.methods}/>

    {#if titleEdit}
        <foreignObject x={titleEditorBbox.x} y={titleEditorBbox.y} width={s.getWidth()} height={titleEditorBbox.height} on:click|stopPropagation={()=>{}}>
            <textarea class="w-full h-full bg-green-200 font-mono text-xs resize-none" bind:value={s.name}/>
        </foreignObject>
    {/if}
</svg>

<svelte:window on:mouseup={onMouseUp} on:mousemove={onMouseMove} on:click={unfocus}/>