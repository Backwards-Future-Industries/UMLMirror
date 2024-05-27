<script lang="ts">
    import TextAreaInput from "$lib/components/higherLevel/textAreaInput.svelte";
    import DiagramSVG from '$lib/components/widgets/diagramSVG.svelte' 
    import { onMount } from "svelte";
    import { handleGenSVG } from "$lib/scripts/APICalls";
    import { diagram } from "$lib/stores/diagram";

    onMount(() => {
        handleGenSVG().then(result => $diagram = result);
    });

</script>

<div class="flex flex-row relative top-0 left-0">
    <TextAreaInput/>
    <DiagramSVG/>
</div>