<script lang="ts">
    
    let textArea: string = 'class Class {\n' +
        '    - String name;\n' +
        '    - Enum type;\n' +
        '    - String[] attributes;\n' +
        '    - String[] methods;\n' +
        '}\n\n' +

        'class Attribute {\n' +
        '    - String name;\n' +
        '    - Enum accessModifier;\n' +
        '    - String dataType;\n' +
        '}\n\n' +

        'Class ..|> Attribute\n';

</script>



<div class="flex flex-col">
    <textarea id="diagramtext" class="resize-none w-96 bg-base-200 pl-3 pt-2 pr-3 font-mono flex-grow h-screen" spellcheck="false" bind:value={textArea}/>
    <button on:click class=" bg-base-400 hover:bg-base-600 text-white font-bold py-2 px-4 rounded">
        create diagram
    </button>
</div>