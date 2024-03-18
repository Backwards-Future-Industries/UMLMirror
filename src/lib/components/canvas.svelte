<script>
    import ClassBox from "./classBox.svelte";


    let width = 1000
    let height = 1000;
    $: classes = [];

    export function handleClick(){
        $: newClass = new ClassBox({
            target: document.getElementById('diagram'),
        });
        classes.push({title: newClass.title, x: newClass.x, y: newClass.y});
        console.log(classes);
        
    }
</script>


<svg id="diagram" class="flex" width={width} height={height}>
</svg>