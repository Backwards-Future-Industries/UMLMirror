<script lang="ts">
    import TextAreaInput from "$lib/components/textAreaInput.svelte";

    let diagramtext: string = "";

    function testButton() {
        console.log(diagramtext);
    }

</script>

<div class="flex flex-row relative top-0 left-0">
    <TextAreaInput bind:textArea={diagramtext} on:click={testButton}/>
    <div>test</div>
</div>