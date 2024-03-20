<script lang="ts">
    import { createClasses } from "$lib/stores/classes";

    let classes = createClasses();

    export let class1: string;
    export let class2: string;

    let x1: number | undefined = classes.get(class1)?.x;
    let y1: number | undefined = classes.get(class1)?.y;
    let x2: number | undefined = classes.get(class2)?.x;
    let y2: number | undefined = classes.get(class2)?.y;
</script>


<svg>
    <line x1={x1} y1={y1} x2={x2} y2={y2} stroke="black" stroke-width="2" />
</svg>