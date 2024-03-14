<script>
    import TextAreaInput from "../../lib/components/textAreaInput.svelte";
    import "../../app.css";

    function testButton() {
        alert("test");
    }

</script>

<div class="flex flex-row relative top-0 left-0">
    <TextAreaInput on:click={testButton}/>
    <div>test</div>
</div>