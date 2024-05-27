<script lang="ts">
    import { associationTextArea, classTextArea } from "$lib/stores/textAreas";
    import TextWindow from "../widgets/textWindow.svelte";
    import { updateText } from '$lib/scripts/textParser'
    import { handleGenSVG } from "$lib/scripts/APICalls";
    import { diagram } from "$lib/stores/diagram";
    

    $: classText = $classTextArea
    $: associationText = $associationTextArea

    function handleUpdate() {
        updateText(classText, associationText)

        if(window.location.pathname === '/textual'){
            handleGenSVG().then(result => $diagram = result);
        }
    }

</script>

<div class="flex flex-col h-screen">
    <div class="h-2/3">
        <TextWindow bind:text={classText} title={'Classes'} on:textChange={handleUpdate}/>
    </div>
    <div class="h-1/3">
        <TextWindow bind:text={associationText} title={'Associations'} on:textChange={handleUpdate}/>
    </div>
</div>