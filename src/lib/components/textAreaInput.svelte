<script lang="ts">
    
    export let textArea: string =  '';

    function generateExampleText(){
        textArea =  "class: Person {" +
            "\nat:"+
            "\n\"- name: String\"" +
            "\n\"- age: int\"" +
            "\nme:"+
            "\n\"+ getName(): String\"" +
            "\n\"+ getAge(): int\"" +
            "\n}" +
            "\n\n" + 
            "class: Dog {" +
            "\nat:"+
            "\n\"- name: String\"" +
            "\n\"- age: int\"" +
            "\nme:"+
            "\n\"+ getName(): String\"" +
            "\n\"+ getAge(): int\"" +
            "\n}";
    }

</script>



<div class="flex flex-col">
    <textarea id="diagramtext" class="resize-none w-96 bg-base-200 pl-3 pt-2 pr-3 font-mono flex-grow h-screen" spellcheck="false" bind:value={textArea}/>
    <div class="flex-row w-max">
        <button on:click class=" bg-base-400 hover:bg-base-600 text-white font-bold py-2 px-4 rounded">
            create diagram
        </button>
        <button on:click={generateExampleText} class=" bg-base-400 hover:bg-base-600 text-white font-bold py-2 px-4 rounded">
            example input
        </button>
    </div>
    
</div>