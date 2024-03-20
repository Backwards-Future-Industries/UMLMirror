<script lang="ts">
    import { faker } from '@faker-js/faker/locale/da';
    import ClassBox from "./classBox.svelte";
    import { createClasses } from "$lib/stores/classes";

    let classes = createClasses();

    let width: number = 1000
    let height: number = 1000;

    export function handleClick(){
        let newClass = new ClassBox({
            // @ts-ignore
            target: document.getElementById('diagram'),
            accessors: true,
            props:{
                title: faker.person.firstName(), 
                attributes: "Attributes", 
                methods:"Methods",
                x: 0, y: 0,
            }
        });
        //classes = [...classes, {title: newClass.title, x: newClass.x, y: newClass.y}];
        console.log(classes);
    }
</script>

<svg id="diagram" class="flex" width={width} height={height}>
</svg>