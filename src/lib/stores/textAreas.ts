import { derived } from 'svelte/store';
import { classes } from './classes';
import { associations } from './associations';

export const classTextArea = derived(
    classes,
    ($classes) => JSON.stringify(filterFields($classes),null,1)

)

export const associationTextArea = derived(
    associations,
    ($associations) => JSON.stringify($associations)
)


function filterFields(jsonData: any): any {
    let filteredData: { [key: string]: any } = {};

    for (const key in jsonData) {
        const { x, y, width, height, id,...rest } = jsonData[key];
        filteredData[key] = rest;
    }

    return filteredData;
}