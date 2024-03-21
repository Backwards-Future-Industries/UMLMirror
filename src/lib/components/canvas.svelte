<script lang="ts">
    import { faker } from '@faker-js/faker/locale/da';
    import ClassBox from "./classBox.svelte";
    import { classes } from "$lib/stores/classes";
    import { incrementer } from '$lib/stores/incrementer';
    import { classStoreObject } from '$lib/objects/classStoreObject';
    import association from './association.svelte';

    let width: number = 1000
    let height: number = 1000;
    let lastClicked: string = "0";

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

        let newClassBox = new ClassBox({
            // @ts-ignore
            target: document.getElementById('diagram'),
            props:{
                s: newClass
            }
        });
        newClassBox.$on('clicked', (event)=>{
            focused(event.detail);
        });
        
        console.log(classes.getAll());
    }

    function focused(id: string){
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
</svg>