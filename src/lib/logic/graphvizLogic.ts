import { classes } from "$lib/stores/classes";
import { associations } from "$lib/stores/associations";


export async function handleGenSVG(): Promise<string> {
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

    return result; 

}

export async function handlePrettify(){

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