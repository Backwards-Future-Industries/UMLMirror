<script lang="ts">
    import ClassBox from "../widgets/classBox.svelte";
    import Association from '../widgets/association.svelte';
    import { classes } from "$lib/stores/classes";
    import { associations } from "$lib/stores/associations";

    let width: number = furthestX();
    let height: number = furthestY();

    function furthestX(): number{
        let furthest: number = 1000

        let allClasses = Object.values($classes);
        allClasses.forEach((value)=>{
            if(furthest < value.getX() + value.getWidth()){
                furthest = value.getX() + value.getWidth()
            }
        })
        return furthest + 50
    }
    
    function furthestY(): number{
        let furthest: number = 1000

        let allClasses = Object.values($classes);
        allClasses.forEach((value)=>{
            if(furthest < value.getY() + value.getHeight()){
                furthest = value.getY() + value.getHeight()
            }
        })
        return furthest + 50
    }

    classes.subscribe(()=>{
        width = furthestX()
        height = furthestY()
    })

</script>

<!-- svelte-ignore a11y-no-static-element-interactions -->
<!-- svelte-ignore a11y-click-events-have-key-events -->
<svg id="diagram"  class="flex" width={width} height={height}>
    {#each $associations as association, index}
        <Association fromID={association.from} toID={association.to} id={index} />
    {/each}
    {#each Object.values($classes) as box}
        <ClassBox s={box}/>
    {/each}
</svg>