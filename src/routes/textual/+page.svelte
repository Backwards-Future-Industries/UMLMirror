<script lang="ts">
    import TextAreaInput from "$lib/components/textAreaInput.svelte";
    import { classes } from "$lib/stores/classes";
    import { associations } from "$lib/stores/associations";
    import { incrementer } from "$lib/stores/incrementer";
    import { xClass } from "$lib/objects/xClass";
    import { xAssociation } from "$lib/objects/xAssociation";
    
    let classAreaText: string = "";
    let associationAreaText: string = "";
    let svgString: String = "<svg></svg>";

    async function handleGenSVG(){
        let response = await fetch('api/graphviz/gensvg',{
        method: 'Post',
        body: JSON.stringify({
            classes: classes.stringify(),
            associations: associations.stringify()
            }),
        headers: {
                    'content-type': 'application/json',
                },
        });

        let {result} = await response.json();
        handlePrettify();

        svgString = result; 

    }

    async function handlePrettify(){

        let response = await fetch('api/graphviz/prettify',{
            method: 'Post',
            body: JSON.stringify({
                classes: classes.stringify(),
                associations: associations.stringify()
                }),
            headers: {
                        'content-type': 'application/json',
            },
        });

        let {result} = await response.json();  
        console.log(result);

        classes.updateFromDotString(result)

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

        //TODO: Removel of associations

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

    function updateDiagram() {
        
        updateClasses(classAreaText);
        updateAssociations(associationAreaText);

        console.log(JSON.parse(classAreaText));
        console.log(JSON.parse(associationAreaText));

        handleGenSVG();
    }

</script>

<div class="flex flex-row relative top-0 left-0">
    <TextAreaInput bind:classArea={classAreaText} bind:associationArea={associationAreaText} on:click={updateDiagram}/>
    <div>
        <div>
            {@html svgString}
        </div>
    </div>
</div>