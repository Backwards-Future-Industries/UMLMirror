<script lang="ts">
    import { classStoreObject } from '$lib/objects/classStoreObject';

    export let class1: classStoreObject
    export let class2: classStoreObject
    
</script>


<svg>
    <line x1={class1.x} y1={class1.y} x2={class2.x} y2={class2.y} stroke="black" stroke-width="2" />
</svg>