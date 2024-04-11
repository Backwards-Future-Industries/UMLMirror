<svelte:options accessors/>
<script lang="ts">
    import { xClass } from '$lib/objects/xClass';
    import { classes } from '$lib/stores/classes';
    import { focus } from '$lib/stores/focus'
    import { xAssociation } from '$lib/objects/xAssociation';
    import { associations } from "$lib/stores/associations";
    
    export let s: xClass;
    let xClassMethods: SVGGraphicsElement
    let xClassAttributes: SVGGraphicsElement
    let methodEditorBbox: DOMRect
    let attributeEditorBbox: DOMRect
    let methodEditText: string = arraytostring(s.methods.value)
    let attributeEditText: string = arraytostring(s.attributes.value)


    let moving = false;
    $: methodEdit = false;
    $: attributeEdit = false;
	
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
        if(methodEdit || attributeEdit){
            s.updateMethodsFromHTML(methodEditText)
            s.updateAttributesFromHTML(attributeEditText)
            classes.replace(s.getId(),s)
        }
        methodEdit = false;
        attributeEdit = false;
    }

    function methodDblClick(){
        methodEditorBbox = xClassMethods.getBBox();
        methodEdit = true;
    }
    function attributeDblClick(){
        attributeEditorBbox = xClassAttributes.getBBox();
        attributeEdit = true;
    }
    function defuse(){
    }

    function arraytostring(list:string[]): string{
        let result = ""

        list.forEach((value,index,array)=>{
        result += `${value}`
            if (index < array.length - 1){
                result += `\n`
            }
        })
        return result
    }

</script>


<!-- svelte-ignore a11y-no-static-element-interactions -->
<!-- svelte-ignore a11y-click-events-have-key-events -->

<svg x={s.x} y={s.y} width={s.getWidth()+4} height={s.getHeight() +4}>
    <rect x={2} y={2} width={s.getWidth()} height={s.getHeight()} on:mousedown={onMouseDown} stroke="black" stroke-width="2" fill="ghostwhite" rx="10" ry="10" class=" hover:cursor-move" />
    
    <text on:click|stopPropagation={clicked} x={s.getWidth()/2} y={20} text-anchor="middle" font-size="16" font-weight="bold">{s.name}</text>
    
    <line x1={2} y1={24} x2={s.getWidth()+2} y2={24} stroke="black" stroke-width="2" />
    
    <g on:dblclick|stopPropagation={attributeDblClick} bind:this={xClassAttributes}>
        {#each s.attributes.value as value, index}
        <text x={5} y={40+16*index} text-anchor="start" font-size="14" font-family="monospace">{value}</text>
        {/each}
    </g>
    
    <line x1={2} y1={(2+s.getAttributeLines())*16} x2={s.getWidth()+2} y2={(2+s.getAttributeLines())*16} stroke="black" stroke-width="2" />
    
    <g on:dblclick|stopPropagation={methodDblClick} bind:this={xClassMethods} >
        {#each s.methods.value as value, index}
        <text x={5} y={(3+s.getAttributeLines())*16+16*index} text-anchor="start" font-size="14" font-family="monospace">{value}</text>
        {/each}
    </g>
    {#if attributeEdit}
        <foreignObject x={attributeEditorBbox.x} y={attributeEditorBbox.y} width={s.getWidth()} height={attributeEditorBbox.height} on:click|stopPropagation={defuse}>
            <textarea class="w-full h-full bg-green-200 font-mono text-xs resize-none" bind:value={attributeEditText}/>
        </foreignObject>
    {/if}
    {#if methodEdit}
        <foreignObject x={methodEditorBbox.x} y={methodEditorBbox.y} width={s.getWidth()} height={methodEditorBbox.height} on:click|stopPropagation={defuse}>
            <textarea class="w-full h-full bg-green-200 font-mono text-xs resize-none" bind:value={methodEditText}/>
        </foreignObject>
    {/if}
</svg>

<svelte:window on:mouseup={onMouseUp} on:mousemove={onMouseMove} on:click={unfocus}/>