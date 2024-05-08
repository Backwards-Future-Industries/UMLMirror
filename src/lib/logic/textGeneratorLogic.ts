import { classes } from "$lib/stores/classes";
import { associations } from "$lib/stores/associations";


export class TextGenerator {
    private static instance: TextGenerator;

    private constructor() {}

    public static getInstance(): TextGenerator {
        if (!this.instance) {
            this.instance = new TextGenerator();
        }

        return this.instance;
    }

    public generateAssociationText(): string {
        let importedAssociations: string = associations.stringify();
        return importedAssociations;
    }

    public generateClassText(): string {
        let filteredClasses= filterFields(classes.getAll());
        return JSON.stringify(filteredClasses,null,1);
    }

    
}

function filterFields(jsonData: any): any {
    let filteredData: { [key: string]: any } = {};

    for (const key in jsonData) {
        const { x, y, width, height, ...rest } = jsonData[key];
        filteredData[key] = rest;
    }

    return filteredData;
}