<script lang="ts">
    import TextAreaInput from "$lib/components/textAreaInput.svelte";
    import { classes } from "$lib/stores/classes";
    import { associations } from "$lib/stores/associations";
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

        svgString = result; 

    }

    function cleanUpClasses(classAreaText: string){
        let parsedClasses = JSON.parse(classAreaText);
        let parsedIds = Object.values(parsedClasses).map(obj => obj.id);
        let currentClasses = classes.getAll();
        let currentIds = Object.keys(currentClasses).map(key => currentClasses[key].getId());

        currentIds.forEach(id => {
            if (!parsedIds.includes(id)) {
                let keyToRemove = Object.keys(currentClasses).find(key => currentClasses[key].getId() === id);
                if (keyToRemove) {
                    classes.remove(keyToRemove);
                    associations.deleteFromKey(id);
                }
            }
        });
    }

    function cleanUpAssociations(associationAreaText: string){
        //coming soon when associations are updated
    }



    function createDiagram() {
        
        cleanUpClasses(classAreaText);
        cleanUpAssociations(associationAreaText);

        console.log(JSON.parse(classAreaText));
        console.log(JSON.parse(associationAreaText));

        classAreaText = classes.stringify();
        associationAreaText = associations.stringify();
    }

</script>

<div class="flex flex-row relative top-0 left-0">
    <TextAreaInput bind:classArea={classAreaText} bind:associationArea={associationAreaText} on:click={createDiagram}/>
    <div>
        <button on:click={handleGenSVG} class=" bg-base-400 hover:bg-base-600 text-white font-bold py-2 px-4 rounded">
            generate SVG
        </button>
        <div>
            {@html svgString}
        </div>
    </div>
</div>