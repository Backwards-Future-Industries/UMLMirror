import { associationStoreObject } from '$lib/objects/associationStoreObject';
import { classStoreObject } from '$lib/objects/classStoreObject';
import { execSync } from 'child_process';
import * as fs from 'fs';

export function prettify(classes:string, associations:string): string {
    
    createDotStringAndFile(classes, associations);

    let dotComand = `dot -Tplain graph.dot`;
    let result = "";
    
    try{
        result = execSync(dotComand).toString();
    }catch(error){
        console.error('Error executing command:', error);
    }

    return result;
}

export function generateSVG(classes:string, associations:string):string{
    
    createDotStringAndFile(classes, associations,true);

    let dotComand = `dot -Tsvg graph.dot`;
    let result = "";
    
    try{
        result = execSync(dotComand).toString();
    }catch(error){
        console.error('Error executing command:', error);
    }

    let encodedResult = Buffer.from(result).toString('base64');

    return encodedResult;
}

function createDotStringAndFile(classes: string, associations: string, svg:boolean=false):void {
    let allClassesDick = classStoreObject.fromJSONString(classes);
    let allClasses = Object.values(allClassesDick);
    let allAssociations = associationStoreObject.fromJSONString(associations);

    let dotString = "digraph G {\n";

    if(svg){
        dotString += "node [shape=plaintext];\n"
        allClasses.forEach((n) => {
            dotString += addNodesSVG(n);
        });
    }else{
        allClasses.forEach((n) => {
            dotString += addNodes(n);
        });
    }

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
}

function addNodes(klasse:classStoreObject): string {
    return `\t${klasse.getId()} [shape=box,width=${klasse.width/72},height=${klasse.height/72}];\n`;
}

function addNodesSVG(klasse: classStoreObject):string{
    return`\n${klasse.getId()}[
        label=<
            <table border="0" cellborder="1" cellspacing="0" width="auto">
                <tr>
                    <td bgcolor="lightgrey"><b>${klasse.title}</b></td>
                </tr>
                <tr>
                    <td align="left" port="attributes">${getTableString(klasse.attributes)}</td>
                </tr>
                <tr>
                    <td align="left" port="methods">${getTableString(klasse.methods)}</td>
                </tr>
            </table>>];`
}

function getTableString(list: string[]):string{

    let result = ""

    list.forEach((value,index,array)=>{
        
        result += `${value}`

        if (index < array.length - 1){
            result += `<br/>`
        }
    })

    return result
}

function addEdges(association:associationStoreObject): string {
    return `\t${association.from} -> ${association.to};\n`;
}