<script lang="ts">
    import { classes } from '$lib/stores/classes';
    import { associationFocus } from '$lib/stores/focuses';

    export let classId1: string;
    export let classId2: string;
    export let id: number
    
    let class1 = classes.get(classId1);
    let class2 = classes.get(classId2);

    classes.subscribe((value) => {
        class1 = value[classId1];
        class2 = value[classId2];
    });

    function setfocus(){
        associationFocus.set(id)
    }

    function unfocus(){
        associationFocus.set(-1)
    }

</script>

<!-- svelte-ignore a11y-no-static-element-interactions -->
<!-- svelte-ignore a11y-click-events-have-key-events -->
<svg>
    <line x1={class1.x + class1.getWidth()/2} y1={class1.y + class1.getHeight()/2} x2={class2.x + class2.getWidth()/2} y2={class2.y+ class2.getHeight()/2} stroke={$associationFocus==id ? "mediumslateblue":"black"} stroke-width="2" on:click|stopPropagation={setfocus} class=" hover:cursor-pointer"/>
</svg>

<svelte:window on:click={unfocus}/>