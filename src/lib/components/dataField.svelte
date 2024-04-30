<script lang="ts">
    import type { xClass } from "$lib/objects/xClass";
    import { classes } from "$lib/stores/classes";

    export let data:data;
    export let s: xClass
    export let startY: number
    let graphicsElement: SVGGraphicsElement;
    let DOMRect: DOMRect;
    let editText: string = arraytostring(data.value);
    $: editable = false;

    function attributeDblClick(){
        DOMRect = graphicsElement.getBBox();
        editable = true;
    }

    function closeEditor(){
        editable = false;
        data.value = editText.split(/\r?\n/);
        classes.replace(s.getId(),s)
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
{#if !editable}
    <g on:dblclick|stopPropagation={attributeDblClick} bind:this={graphicsElement}>
        {#each data.value as value, index}
        <text x={5} y={startY+16*index} text-anchor="start" font-size="14" font-family="monospace">{value}</text>
        {/each}
    </g>
{:else}
    <foreignObject x={DOMRect.x} y={DOMRect.y} width={DOMRect.width} height={DOMRect.height} on:click|stopPropagation={()=>{}}>
        <textarea class="w-full h-full bg-green-200 font-mono text-xs resize-none" bind:value={editText}/>
    </foreignObject>
{/if}

<svelte:window on:click={closeEditor}/>