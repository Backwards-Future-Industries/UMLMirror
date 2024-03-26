<script lang="ts">
    import { faker } from '@faker-js/faker/locale/da';
    import ClassBox from "./classBox.svelte";
    import { classes } from "$lib/stores/classes";
    import { incrementer } from '$lib/stores/incrementer';
    import { classStoreObject } from '$lib/objects/classStoreObject';
    import association from './association.svelte';
    import type { EventDispatcher } from 'svelte';

    let width: number = 1000
    let height: number = 1000;
    let lastClicked: string = "0";

    $: values = Object.values($classes);

    export function handleClick(){
        
        incrementer.increment();
        let newClass = new classStoreObject(
            faker.person.firstName(), 
            ["Attributes"], 
            ["Methods"],
            0, 0,
            incrementer.getString()
        );
        classes.add(incrementer.getString(), newClass);
        
        console.log(classes.getAll());
    }

    function focused(event: any){
        let id = event.detail.id;
        if(lastClicked != "0" && id != lastClicked){
            new association({
                // @ts-ignore
                target: document.getElementById('diagram'),
                props:{
                    id1: lastClicked,
                    id2: id
                }
            });
        }
        lastClicked = id;
        console.log(lastClicked);
    }
</script>

<!-- svelte-ignore a11y-no-static-element-interactions -->
<!-- svelte-ignore a11y-click-events-have-key-events -->
<svg id="diagram"  class="flex" width={width} height={height}>
    {#each values as box}
        <ClassBox s={box} on:clicked={focused} />
    {/each}
</svg>