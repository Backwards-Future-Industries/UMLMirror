<script lang="ts">
    import TextAreaInput from "$lib/components/textAreaInput.svelte";
    import { classes } from "$lib/stores/classes";
    import { associations } from "$lib/stores/associations";
    
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

    function createDiagram() {
        console.log(JSON.parse(classAreaText));
        console.log(JSON.parse(associationAreaText));
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