<script lang="ts">
    import { onMount } from "svelte";
    import { classes } from "$lib/stores/classes";
    import { associations } from "$lib/stores/associations";
    import { incrementer } from "$lib/stores/incrementer";
    import { xClass } from "$lib/objects/xClass";
    import { xAssociation } from "$lib/objects/xAssociation";
    import { createEventDispatcher } from "svelte";

    onMount(() => {
        generateTextFromStores();
    });

    let dispatch = createEventDispatcher();
    let classArea: string =  '';
    let associationArea: string = '';

    function handleTab(e: KeyboardEvent) {
        if (e.key === "Tab") {
            e.preventDefault();
            let start = this.selectionStart;
            let end = this.selectionEnd;

            this.value = this.value.substring(0, start) + "\t" + this.value.substring(end);
            this.selectionStart = this.selectionEnd = start + 1;
        }
    }

    function updateClasses(classAreaText: string){
        let parsedClasses = JSON.parse(classAreaText);
        let parsedIds = Object.values(parsedClasses).map(obj => obj.id);
        let currentClasses = classes.getAll();
        let currentIds = Object.keys(currentClasses).map(key => currentClasses[key].getId());

        //Remove removed classes
        currentIds.forEach(id => {
            if (!parsedIds.includes(id)) {
                let idToRemove = Object.keys(currentClasses).find(key => currentClasses[key].getId() === id);
                if (idToRemove) {
                    classes.remove(idToRemove);
                    associations.deleteFromKey(id);
                }
            }
        });

        //updates existing classes
        parsedIds.forEach(id => {
            if (currentIds.includes(id)) {
                let updatedClass = new xClass(
                    parsedClasses[id].id, 
                    parsedClasses[id].name, 
                    parsedClasses[id].attributes, 
                    parsedClasses[id].methods,
                    currentClasses[id].getX(),
                    currentClasses[id].getY(),
                    currentClasses[id].getWidth(),
                    currentClasses[id].getHeight()
                    );
                classes.replace(id, updatedClass);
            }
        });

        //Adds new classes
        parsedIds.forEach(id => {
            if (!currentIds.includes(id)) {
                let classToAdd = parsedClasses[id];
                let newClass = new xClass(
                    classToAdd.id, 
                    classToAdd.name, 
                    classToAdd.attributes, 
                    classToAdd.methods
                    );
                incrementer.increment();
                classes.add(classToAdd.id, newClass);
            }
        });


    }

    function updateAssociations(associationAreaText: string) {
        let parsedAssociations = JSON.parse(associationAreaText).map((item: any) => new xAssociation(item.from, item.to));
        let currentAssociations = associations.getAll();
        let currentAssocMap = new Map(currentAssociations.map(assoc => [assoc.from + "-" + assoc.to, assoc]));

        //Fetch class Ids
        let currentClasses = classes.getAll();
        let currentIds = Object.keys(currentClasses).map(key => currentClasses[key].getId());

        removeAssociations(currentAssociations, parsedAssociations);

        //Add new associations
        parsedAssociations.forEach((parsedAssoc: xAssociation) => {
            //check if parsedAssoc.from and parsedAssoc.to are in classes.getAll() ids
            if (!currentIds.includes(parsedAssoc.from) || !currentIds.includes(parsedAssoc.to)) {
                return;
            }
            let assocKey = parsedAssoc.from + "-" + parsedAssoc.to;
            if (!currentAssocMap.has(assocKey)) {
                associations.add(parsedAssoc);
            }
        });
    }

    function removeAssociations(currentAssociations: xAssociation[], parsedAssociations: xAssociation[]){
        let indicesToRemove: number[] = [];

        currentAssociations.forEach((assoc: xAssociation, index: number) => {
            if (!parsedAssociations.some(parsedAssoc => parsedAssoc.from === assoc.from && parsedAssoc.to === assoc.to)) {
                indicesToRemove.push(index);
            }
        });

        indicesToRemove.reverse();

        for (const index of indicesToRemove) {
            associations.remove(index);
        }
    }

    function updateDiagram() {
        
        updateClasses(classArea);
        updateAssociations(associationArea);

        generateTextFromStores();

    }

    function generateTextFromStores(){
        let importedAssociations: string = associations.stringify();
        associationArea = importedAssociations;
        let filteredClasses= filterFields(classes.getAll());
        classArea = JSON.stringify(filteredClasses,null,1);
    }

    function filterFields(jsonData: any): any {
        let filteredData: { [key: string]: any } = {};

        for (const key in jsonData) {
            const { x, y, width, height, ...rest } = jsonData[key];
            filteredData[key] = rest;
        }

        return filteredData;
    }

    function handleClick() {
        updateDiagram();
        dispatch("updateDraw");
    }

</script>

<div class="flex flex-col h-screen">
    <h2 class="text-2xl font-bold text-center bg-base-400 p-1">Classes</h2>
    <textarea on:keydown={handleTab} id="classText" class="resize-none w-96 bg-base-200 pl-3 pt-2 pr-3 font-mono flex-grow h-3/4 border-2 border-r-2 rounded" spellcheck="false" bind:value={classArea}/>
    <h2 class="text-2xl font-bold text-center bg-base-400 p-1">Associations</h2>
    <textarea on:keydown={handleTab} id="associationText" class="resize-none w-96 bg-base-200 pl-3 pt-2 pr-3 font-mono flex-grow h-1/4 border-2 border-r-2 rounded" spellcheck="false" bind:value={associationArea}/> 
    <button on:click={handleClick} class="bg-base-400 hover:bg-base-600 text-white font-bold py-2 px-4 w-96 rounded">
        Update diagram
    </button>
</div>