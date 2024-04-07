import { xAssociation } from '$lib/objects/xAssociation';
import { xClass } from '$lib/objects/xClass';
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
    let allClassesDick = xClass.fromJSONString(classes);
    let allClasses = Object.values(allClassesDick);
    let allAssociations = xAssociation.fromJSONString(associations);

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

function addNodes(xClass:xClass): string {
    return `\t${xClass.getId()} [shape=box,width=${xClass.width/72},height=${xClass.height/72}];\n`;
}

function addNodesSVG(xClass: xClass):string{
    return`\n${xClass.getId()}[
        label=<
            <table border="0" cellborder="1" cellspacing="0" width="auto">
                <tr>
                    <td bgcolor="lightgrey"><b>${xClass.name}</b></td>
                </tr>
                <tr>
                    <td align="left" port="attributes">${getTableString(xClass.attributes)}</td>
                </tr>
                <tr>
                    <td align="left" port="methods">${getTableString(xClass.methods)}</td>
                </tr>
            </table>>];`
}

function getTableString(listobject: data):string{

    let list = listobject.value
    
    let result = ""

    list.forEach((value,index,array)=>{
        
        result += `${value}`

        if (index < array.length - 1){
            result += `<br/>`
        }
    })

    return result
}

function addEdges(xAssociation:xAssociation): string {
    return `\t${xAssociation.from} -> ${xAssociation.to};\n`;
}