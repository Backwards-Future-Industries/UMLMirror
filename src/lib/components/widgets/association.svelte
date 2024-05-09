<script lang="ts">
    import { classes } from '$lib/stores/classes';
    import { associationFocus } from '$lib/stores/focuses';
    import { getScenario } from '$lib/logic/placementScenario'

    export let fromID: string;
    export let toID: string;
    export let id: number
    
    $: from = $classes[fromID]
    $: to = $classes[toID]
    $: scenario = getScenario(from,to)

    $: x1Left = Math.round(from.x + from.getWidth()*3/8)
    $: x1Mid = Math.round(from.x + from.getWidth()/2)
    $: x1Right = Math.round(from.x + from.getWidth()*5/8)

    $: y1Top = Math.round(from.y)
    $: y1Mid = Math.round(from.y + from.getHeight()/2)
    $: y1But = Math.round(from.y + from.getHeight())

    $: x2Left = Math.round(to.x + to.getWidth()*3/8)
    $: x2Mid = Math.round(to.x + to.getWidth()/2)
    $: x2Right = Math.round(to.x + to.getWidth()*5/8)

    $: y2Top = Math.round(to.y)
    $: y2Mid = Math.round(to.y + to.getHeight()/2)
    $: y2But = Math.round(to.y + to.getHeight())

    function setfocus(){
        associationFocus.set(id)
    }

    function unfocus(){
        associationFocus.set(-1)
    }

</script>

<!-- svelte-ignore a11y-no-static-element-interactions -->
<!-- svelte-ignore a11y-click-events-have-key-events -->
<svg>
    <defs>
        <marker
            id="head"
            viewBox="0 0 10 10"
            refX="5"
            refY="5"
            markerWidth="6"
            markerHeight="6"
            orient="auto-start-reverse">
            <path d="M 0 0 L 10 5 L 0 10 z" />
        </marker>
    </defs>

    {#if scenario == -4} <!-- scenario -4 -->
        <path d="M{x1Right},{y1But} {x2Left},{y2Top}" marker-end="url(#head)"
        stroke={$associationFocus==id ? "mediumslateblue":"black"} stroke-width="2" on:click|stopPropagation={setfocus} class=" hover:cursor-pointer"/>
    {:else if scenario == -2} <!-- scenario -2 -->
        <path d="M{x1Right},{y1Top} {x2Left},{y2But}" marker-end="url(#head)"
        stroke={$associationFocus==id ? "mediumslateblue":"black"} stroke-width="2" on:click|stopPropagation={setfocus} class=" hover:cursor-pointer"/>
    {:else if scenario == -3} <!-- scenario -3 -->
        <path d="M{from.x + from.getXMax()},{y1Mid} {to.x},{y2Mid}" marker-end="url(#head)"
        stroke={$associationFocus==id ? "mediumslateblue":"black"} stroke-width="2" on:click|stopPropagation={setfocus} class=" hover:cursor-pointer"/>
    {:else if scenario == 2} <!-- scenario 2 -->
        <path d="M{x1Left},{y1But} {x2Right},{y2Top}" marker-end="url(#head)"
        stroke={$associationFocus==id ? "mediumslateblue":"black"} stroke-width="2" on:click|stopPropagation={setfocus} class=" hover:cursor-pointer"/>
    {:else if scenario == 4} <!-- scenario 4 -->
        <path d="M{x1Left},{y1Top} {x1Right},{y2But}" marker-end="url(#head)"
        stroke={$associationFocus==id ? "mediumslateblue":"black"} stroke-width="2" on:click|stopPropagation={setfocus} class=" hover:cursor-pointer"/>
    {:else if scenario == 3} <!-- scenario 3 -->
        <path d="M{from.x},{y1Mid} {to.x + to.getXMax()},{y2Mid}" marker-end="url(#head)"
        stroke={$associationFocus==id ? "mediumslateblue":"black"} stroke-width="2" on:click|stopPropagation={setfocus} class=" hover:cursor-pointer"/>
    {:else if scenario == -1} <!-- scenario -1 -->
        <path d="M{x1Mid},{y1But} {x2Mid},{y2Top}" marker-end="url(#head)"
        stroke={$associationFocus==id ? "mediumslateblue":"black"} stroke-width="2" on:click|stopPropagation={setfocus} class=" hover:cursor-pointer"/>
    {:else if scenario == 1} <!-- scenario 1 -->
        <path d="M{x1Mid},{y1Top} {x2Mid},{y2Mid    }" marker-end="url(#head)"
        stroke={$associationFocus==id ? "mediumslateblue":"black"} stroke-width="2" on:click|stopPropagation={setfocus} class=" hover:cursor-pointer"/>
    {:else if scenario == 0} <!-- scenario 0 -->
    {/if}
</svg>

<svelte:window on:click={unfocus}/>