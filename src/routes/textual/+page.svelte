<script lang="ts">
    import TextAreaInput from "$lib/components/textAreaInput.svelte";

    let diagramText: string =  "class: Person {" +
    "\nat:"+
    "\n\"- name: String\"" +
    "\n\"- age: int\"" +
    "\nme:"+
    "\n\"+ getName(): String\"" +
    "\n\"+ getAge(): String\"" +
    "\n}";

    function createDiagram() {
        console.log(diagramText);
    }

</script>

<div class="flex flex-row relative top-0 left-0">
    <TextAreaInput bind:textArea={diagramText} on:click={createDiagram}/>
    <div>test</div>
</div>