<script lang="ts">
    
    export let textArea: string =  'classDiagram\n' +
    '    Animal <|-- Duck\n' +
    '    Animal <|-- Fish\n' +
    '    Animal <|-- Zebra\n' +
    '\n' +
    'class Animal{\n' +
    '    +int age\n' +
    '    +String gender\n' +
    '    Animal: +isMammal()\n' +
    '    Animal: +mate()\n' +
    '} \n' +
    '\n' +
    'class Duck{\n' +
    '    +String beakColor\n' +
    '    +swim()\n' +
    '    +quack()\n' +
    '}\n' +
    '\n' +
    'class Fish{\n' +
    '    -int sizeInFeet\n' +
    '    -canEat()\n' +
    '}\n' +
    '\n' +
    'class Zebra{\n' +
    '    +bool is_wild\n' +
    '    +run()\n' +
    '}';

</script>



<div class="flex flex-col">
    <textarea id="diagramtext" class="resize-none w-96 bg-base-200 pl-3 pt-2 pr-3 font-mono flex-grow h-screen" spellcheck="false" bind:value={textArea}/>
    <button on:click class=" bg-base-400 hover:bg-base-600 text-white font-bold py-2 px-4 rounded">
        create diagram
    </button>
</div>