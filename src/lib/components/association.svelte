<script lang="ts">
    import type { classStoreObject } from '$lib/objects/classStoreObject';
    import { createClasses } from '$lib/stores/classes';

    let classes = createClasses();

    export let class1: classStoreObject;
    export let class2: classStoreObject;

</script>


<svg>
    <line x1={50 + class1.x} y1={50 + class1.y} x2={50 + class2.x} y2={50 + class2.y} stroke="black" stroke-width="2" />
</svg>