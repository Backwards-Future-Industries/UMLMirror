<script lang="ts">
    import { classes } from '$lib/stores/classes';

    export let id1: string;
    export let id2: string;
    
    $: class1 = classes.get(id1);
    $: class2 = classes.get(id2);

    classes.subscribe((value) => {
        class1 = value[id1];
        class2 = value[id2];
    });

</script>


<svg>
    <line x1={50 + class1.x} y1={50 + class1.y} x2={50 + class2.x} y2={50 + class2.y} stroke="black" stroke-width="2" />
</svg>