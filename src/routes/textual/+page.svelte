<script lang="ts">
    import TextAreaInput from "$lib/components/textAreaInput.svelte";
    import { onMount } from "svelte";
    import { handleGenSVG } from "$lib/logic/graphvizLogic";
    
    let svgString: String = "<svg></svg>";

    onMount(() => {
        handleGenSVG().then(result => svgString = result);
    });

    function handleClick() {
        handleGenSVG().then(result => svgString = result);
    }
 

</script>

<div class="flex flex-row relative top-0 left-0">
    <TextAreaInput on:updateDraw={handleClick}/>
    <div>
        {@html svgString}
    </div>
</div>



  