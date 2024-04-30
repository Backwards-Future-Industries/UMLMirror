<script lang="ts">
    import ClassBox from "./classBox.svelte";
    import Association from './association.svelte';
    import { classes } from "$lib/stores/classes";
    import { associations } from "$lib/stores/associations";

    let width: number = 1000
    let height: number = 1000;

</script>

<!-- svelte-ignore a11y-no-static-element-interactions -->
<!-- svelte-ignore a11y-click-events-have-key-events -->
<svg id="diagram"  class="flex" width={width} height={height}>
    {#each $associations as association, index}
        <Association classId1={association.from} classId2={association.to} id={index} />
    {/each}
    {#each Object.values($classes) as box}
        <ClassBox s={box}/>
    {/each}
</svg>