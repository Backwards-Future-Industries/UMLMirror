<script lang="ts">
    import { associations } from '$lib/stores/associations';
    import { classes } from '$lib/stores/classes';
    import { associationFocus } from '$lib/stores/focuses';

    export let fromID: string;
    export let toID: string;
    export let id: number
    
    $: from = $classes[fromID]
    $: to = $classes[toID]
    $: controlPointsList = $associations[id].controlPoints
    $: controlPoints = createControlPointString(controlPointsList)


    $: x1 = Math.round(from.x + from.getWidth()/2)
    $: y1 = Math.round(from.y + from.getHeight()/2)
    $: x2 = Math.round(to.x + to.getWidth()/2)
    $: y2 = Math.round(to.y + to.getHeight()/2)

    function setfocus(){
        associationFocus.set(id)
    }

    function unfocus(){
        associationFocus.set(-1)
    }
    
    function createControlPointString(list: string[]): string{

        let points:Number[] = []
        
        list.forEach((value)=>{
            points.push(Number(value)*72)
        })

        let controlPointString = 'C'
        points.forEach((value,index)=>{
            if (index % 2 == 0){
                controlPointString += `${value},${points[index+1]} `
            }
        })

        return controlPointString
    }

</script>

<!-- svelte-ignore a11y-no-static-element-interactions -->
<!-- svelte-ignore a11y-click-events-have-key-events -->
<svg>
    <path d="M{x1},{y1} {controlPoints} {x2},{y2}" stroke={$associationFocus==id ? "mediumslateblue":"black"} stroke-width="2" on:click|stopPropagation={setfocus} class=" hover:cursor-pointer"/>
</svg>

<svelte:window on:click={unfocus}/>