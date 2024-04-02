import { associationStoreObject } from '$lib/objects/associationStoreObject';
import { classStoreObject } from '$lib/objects/classStoreObject';
import { execSync } from 'child_process';
import * as fs from 'fs';

export function prettify(classes:string, associations:string): string {
    
    let allClassesDick = classStoreObject.fromJSONString(classes);
    let allClasses = Object.values(allClassesDick);
    let allAssociations = associationStoreObject.fromJSONString(associations);

    let dotString = "digraph G {\n"

    allClasses.forEach((n) => {
        dotString += addNodes(n);
    });
    allAssociations.forEach((e) => {
        dotString += addEdges(e);
    });
    dotString += "}";

    try{
        fs.writeFileSync('graph.dot', dotString, 'utf8');
        console.log("File written successfully");
    }catch(err){
        console.error("Error writing file", err);
    }

    console.log(dotString);

    let dotComand = `dot -Tplain graph.dot`;
    let result = "";

    
    try{
        result = execSync(dotComand).toString()
    }catch(error){
        console.error('Error executing command:', error);
    }

    console.log(`this is the output from dot\n${result}`)
    return result;
}

function addNodes(klasse:classStoreObject): string {
    return `\t${klasse.getId()} [shape=box,width=${klasse.width/72},height=${klasse.height/72}];\n`;
}

function addEdges(association:associationStoreObject): string {
    return `\t${association.from} -> ${association.to};\n`;
}