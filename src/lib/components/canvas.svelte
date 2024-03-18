<script>
    import { faker } from '@faker-js/faker/locale/da';
    import ClassBox from "./classBox.svelte";

    let width = 1000
    let height = 1000;
    $: classes = [];

    export function handleClick(){
        let newClass = new ClassBox({
            target: document.getElementById('diagram'),
            props:{
                title: faker.person.firstName(), 
                attributes: "Attributes", 
                methods:"Methods",
                x: 0, y: 0,
            }
        });
        classes.push({title: newClass.title, x: newClass.x, y: newClass.y});
        console.log(classes);
    }
</script>

<svg id="diagram" class="flex" width={width} height={height}>
</svg>