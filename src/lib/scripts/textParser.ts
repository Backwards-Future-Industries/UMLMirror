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