<script lang="ts">
    import { faker } from '@faker-js/faker/locale/da';
    import ClassBox from "./classBox.svelte";
    import { createClasses } from "$lib/stores/classes";
    import { createIncrementer } from '$lib/stores/incrementer';
    import { classStoreObject } from '$lib/objects/classStoreObject';

    let classes = createClasses();
    let incrementer = createIncrementer();

    let width: number = 1000
    let height: number = 1000;

    export function handleClick(){
        
        let newClass = new classStoreObject(
            faker.person.firstName(), 
            ["Attributes"], 
            ["Methods"],
            0, 0
        );
        incrementer.increment();
        classes.add(incrementer.getString(), newClass);

        let newClassBox = new ClassBox({
            // @ts-ignore
            target: document.getElementById('diagram'),
            accessors: true,
            props:{
                s: newClass
            }
        });
        //classes = [...classes, {title: newClass.title, x: newClass.x, y: newClass.y}];
        console.log(classes.getAll());
    }
</script>

<svg id="diagram" class="flex" width={width} height={height}>
</svg>