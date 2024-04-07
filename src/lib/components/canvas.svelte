<script lang="ts">
    import ClassBox from "./classBox.svelte";
    import Association from './association.svelte';
    import { classes } from "$lib/stores/classes";
    import { associations } from "$lib/stores/associations";
    import { xAssociation } from '$lib/objects/xAssociation';

    let width: number = 1000
    let height: number = 1000;
    let lastClicked: string = "0";

    $: allClasses = Object.values($classes);

    function focused(event: any){
        let id = event.detail.id;
        if(lastClicked != "0" && id != lastClicked){
            let newAssociation = new xAssociation(lastClicked, id);
            associations.add(newAssociation);
        }
        lastClicked = id;
        console.log(lastClicked);
    }
</script>

<!-- svelte-ignore a11y-no-static-element-interactions -->
<!-- svelte-ignore a11y-click-events-have-key-events -->
<svg id="diagram"  class="flex" width={width} height={height}>
    {#each $associations as association}
        <Association id1={association.from} id2={association.to} />
    {/each}
    {#each allClasses as box}
        <ClassBox s={box} on:clicked={focused} />
    {/each}
</svg>