<svelte:options accessors/>
<script lang="ts">
    import { xClass } from '$lib/objects/xClass';
    import { classes } from '$lib/stores/classes';
    import { focus } from '$lib/stores/focus'
    import { xAssociation } from '$lib/objects/xAssociation';
    import { associations } from "$lib/stores/associations";
    
    export let s: xClass;

    let moving = false;
	
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

    function clicked() {
        if($focus != "0" && s.getId() != $focus){
            let newAssociation = new xAssociation($focus, s.getId());
            associations.add(newAssociation);
        }
        focus.set(s.getId())
        console.log($focus);
    }
    function unfocus(){
        focus.set('0')
    }

</script>


<!-- svelte-ignore a11y-no-static-element-interactions -->
<!-- svelte-ignore a11y-click-events-have-key-events -->

<svg x={s.x} y={s.y} width={s.getWidth()+4} height={s.getHeight() +4}>
    <rect x={2} y={2} width={s.getWidth()} height={s.getHeight()} on:mousedown={onMouseDown} stroke="black" stroke-width="2" fill="ghostwhite" rx="10" ry="10" class=" hover:cursor-move" />
    <g>
        <text on:click|stopPropagation={clicked} x={s.getWidth()/2} y={20} text-anchor="middle" font-size="16" font-weight="bold">{s.name}</text>
    </g>
    <line x1={2} y1={24} x2={s.getWidth()+2} y2={24} stroke="black" stroke-width="2" />
    <g>
        {#each s.attributes.value as value, index}
            <text x={5} y={40+16*index} text-anchor="start" font-size="14" font-family="monospace">{value}</text>
        {/each}
    </g>
    <line x1={2} y1={(2+s.getAttributeLines())*16} x2={s.getWidth()+2} y2={(2+s.getAttributeLines())*16} stroke="black" stroke-width="2" />
    <g>
        {#each s.methods.value as value, index}
            <text x={5} y={(3+s.getAttributeLines())*16+16*index} text-anchor="start" font-size="14" font-family="monospace">{value}</text>
        {/each}
    </g>
</svg>

<svelte:window on:mouseup={onMouseUp} on:mousemove={onMouseMove} on:click={unfocus} />