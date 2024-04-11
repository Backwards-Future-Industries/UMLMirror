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
    <line x1={class1.x + class1.getWidth()/2} y1={class1.y + class1.getHeight()/2} x2={class2.x + class2.getWidth()/2} y2={class2.y+ class2.getHeight()/2} stroke="black" stroke-width="2" />
</svg>