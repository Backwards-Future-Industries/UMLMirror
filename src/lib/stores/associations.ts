import { writable, type Updater } from 'svelte/store';
import { associationStoreObject } from '$lib/objects/associationStoreObject';
import { error } from '@sveltejs/kit';
import { browser } from '$app/environment';


const initialvalue: associationStoreObject[] = getArray();

export const associations = createAssociations(initialvalue);

function getArray(): associationStoreObject[] {
    let rawData: string | null = null;
    if (browser) {
        rawData = window.localStorage.getItem('associations');
    }
    let parsedData: associationStoreObject[]  = rawData ? JSON.parse(rawData) : [];
    let deserializedArray: associationStoreObject[] = [];

    
    deserializedArray = parsedData.map((item: any) => associationStoreObject.fromJSON(item));
    
    return deserializedArray;
}

function createAssociations(initialValue: associationStoreObject[]){
    
    const associations = writable<associationStoreObject[]>(initialValue);

    function add(value: associationStoreObject): void {
        associations.update(current => ([...current, value ]));
        save();
    }

    function get(index: number): associationStoreObject {
        let association: associationStoreObject | undefined;
        associations.subscribe($associations => {
            association = $associations[index];
        })();
        if (association === undefined) {
            error(404, `Flot klaret. Key ${index} not found in the store. ${JSON.stringify(getAll())}`);
        }
        return association;
    }
    
    function getAll(): associationStoreObject[] {
        let allValues: associationStoreObject[] = [];
        associations.subscribe($associations => {
            allValues = $associations;
        })();
        return allValues;
    }

    function save(): void {
        if (browser) {
            window.localStorage.setItem('associations', JSON.stringify(getAll()));
        }
    }

    return {
        ...associations,
        add,
        get,
        getAll,
    }
}