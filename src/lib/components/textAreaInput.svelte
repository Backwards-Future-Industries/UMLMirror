<script lang="ts">
    import { classes } from "$lib/stores/classes";
    import { associations } from "$lib/stores/associations";
    import { xClass } from "$lib/objects/xClass";

    export let classArea: string =  '';
    export let associationArea: string = '';

    function importDiagram(){
        let importedAssociations: string = associations.stringify();
        associationArea = importedAssociations;
        let filteredClasses= filterFields(classes.getAll());
        classArea = JSON.stringify(filteredClasses);
    }

    function filterFields(jsonData: any): any {
        let filteredData: { [key: string]: any } = {};

        for (const key in jsonData) {
            const { x, y, width, height, ...rest } = jsonData[key];
            filteredData[key] = rest;
        }

        return filteredData;
    }

    //TODO: Rewrite to new format
    function generateExampleText(){
        /*textArea =  "class: Person {" +
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
            "\n}";*/
    }

</script>

<div class="flex flex-col h-screen">
    <textarea id="classText" class="resize-none w-96 bg-base-200 pl-3 pt-2 pr-3 font-mono flex-grow h-3/4" spellcheck="false" bind:value={classArea}/>
    <textarea id="associationText" class="resize-none w-96 bg-base-200 pl-3 pt-2 pr-3 font-mono flex-grow h-1/4" spellcheck="false" bind:value={associationArea}/>
    <div class="flex-row w-max">
        <button on:click class=" bg-base-400 hover:bg-base-600 text-white font-bold py-2 px-4 rounded">
            Update diagram
        </button>
        <button on:click={importDiagram} class=" bg-base-400 hover:bg-base-600 text-white font-bold py-2 px-4 rounded">
            Import graphical
        </button>
    </div>
    
</div>