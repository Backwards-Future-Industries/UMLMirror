import { classes } from "$lib/stores/classes";
import { associations } from "$lib/stores/associations";
import { incrementer } from "$lib/stores/incrementer";
import { xClass } from "$lib/objects/xClass";
import { xAssociation } from "$lib/objects/xAssociation";

export function updateText(classText:string, associationText:string){
    updateClasses(classText)
    updateAssociations(associationText)
}

function updateClasses(classAreaText: string){
    let parsedClasses = JSON.parse(classAreaText);
    let parsedKeys = Object.keys(parsedClasses);
    let currentClasses = classes.getAll();
    let currentKeys = Object.keys(currentClasses);

    //Remove removed classes
    currentKeys.forEach(key => {
        if (!parsedKeys.includes(key)) {
            classes.remove(key);
            associations.deleteFromKey(key);
        }
    });

    //updates existing classes
    parsedKeys.forEach(key => {
        if (currentKeys.includes(key)) {
            let updatedClass = new xClass(
                key, 
                parsedClasses[key].name, 
                parsedClasses[key].attributes, 
                parsedClasses[key].methods,
                currentClasses[key].getX(),
                currentClasses[key].getY(),
                currentClasses[key].getWidth(),
                currentClasses[key].getHeight()
                );
            classes.replace(key, updatedClass);
        }
    });

    //Adds new classes
    parsedKeys.forEach(key => {
        if (!currentKeys.includes(key)) {
            let classToAdd = parsedClasses[key];
            let newClass = new xClass(
                key.toString(), 
                classToAdd.name, 
                classToAdd.attributes, 
                classToAdd.methods
                );
            classes.add(key, newClass);
            incrementer.set(Object.keys(currentClasses).length + 1);
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