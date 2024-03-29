import { writable, type Updater } from 'svelte/store';
import { classStoreObject } from '$lib/objects/classStoreObject';
import { error } from '@sveltejs/kit';
import { browser } from '$app/environment';
import { incrementer } from './incrementer';

interface Dictionary {
    [key: string]: classStoreObject;
}
const initialvalue: Dictionary = getDictionary();

export const classes = createClasses(initialvalue);

function getDictionary(): Dictionary {
    let rawData: string | null = null;
    if (browser) {
        rawData = window.localStorage.getItem('classes');
    }
    let parsedData = rawData ? JSON.parse(rawData) : {};
    let deserializedDictionary: Dictionary = {};

    for (const key in parsedData) {
        deserializedDictionary[key] = classStoreObject.fromJSON(parsedData[key]);
    }
    incrementer.set(Object.keys(deserializedDictionary).length);
    return deserializedDictionary;
}

function createClasses(initialValue: Dictionary){
    
    const classes = writable<Dictionary>(initialValue);

    function add(key: string, value: classStoreObject): void {
        classes.update(current => ({ ...current, [key]: value }));
        save();
    }

    function remove(key: string): void {
        classes.update(current => {
            const newState = { ...current };
            delete newState[key];
            return newState;
        });
        save();
    }

    function get(key: string): classStoreObject {
        let itemValue: classStoreObject | undefined;
        classes.subscribe($classes => {
            itemValue = $classes[key];
        })();
        if (itemValue === undefined) {
            error(404, `Flot klaret. Key ${key} not found in the store. ${JSON.stringify(getAll())}`);
        }
        return itemValue;
    }
    
    function getAll(): Dictionary {
        let allValues: Dictionary = {};
        classes.subscribe($classes => {
            allValues = $classes;
        })();
        return allValues;
    }

    function replace(key: string, value: classStoreObject): void {
        classes.update(current => {
            if (current[key] === undefined) {
                error(404, `Flot klaret. Key ${key} not found in the store. ${JSON.stringify(getAll())}`);
            }
            remove(key);
            return {
                ...current,
                [key]: value
            };
        });
        save();
    }

    function save(): void {
        if (browser) {
            window.localStorage.setItem('classes', JSON.stringify(getAll()));
        }
    }

    return {
        ...classes,
        add,
        remove,
        get,
        getAll,
        replace
    }
}