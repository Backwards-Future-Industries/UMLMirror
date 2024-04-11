<script lang="ts">
    import { writable } from "svelte/store";
    import TextAreaInput from "$lib/components/textAreaInput.svelte";
    import { classes } from "$lib/stores/classes";
    import { associations } from "$lib/stores/associations";
    
    let classAreaText: string = "";
    let associationAreaText: string = "";

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
        
        updateSVG(result); 

    }

    function updateSVG(svgString: string){
        let svg = document.getElementById("generatedSVG");
        let searchString = '<svg w';
        let startIndex = svgString.indexOf(searchString);

        // If the substring is found, extract from that point onwards
        if (startIndex !== -1) {
            let cleanedString = svgString.substring(startIndex);
            console.log(cleanedString);
            if (svg) {
                svg.innerHTML = cleanedString;
            }
        } 

        
    }

    function createDiagram() {
        console.log(classes.getAll());
        console.log(associations.getAll());
    }

</script>

<div class="flex flex-row relative top-0 left-0">
    <TextAreaInput bind:classArea={classAreaText} bind:associationArea={associationAreaText} on:click={createDiagram}/>
    <div>
        <button on:click={handleGenSVG} class=" bg-base-400 hover:bg-base-600 text-white font-bold py-2 px-4 rounded">
            generate SVG
        </button>
        <div id="generatedSVG"></div>
    </div>
</div>