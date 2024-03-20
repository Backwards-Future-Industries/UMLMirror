import { writable, type Updater } from 'svelte/store';
import { classStoreObject } from '$lib/objects/classStoreObject';
import { error } from '@sveltejs/kit';

interface Dictionary {
    [key: string]: classStoreObject;
}

export function createClasses(onchange?: (value: Dictionary) => void){
    
    const classes = writable<Dictionary>({});
        
    function update(updater: Updater<Dictionary>){
        classes.update((current) => {
            const newvalue = updater(current);
            if(onchange){
                onchange(newvalue);
            }
            return newvalue;
        });
    }

    function add(key: string, value: classStoreObject): void {
        update(current => ({ ...current, [key]: value }));
    }

    function remove(key: string): void {
        update(current => {
            const newState = { ...current };
            delete newState[key];
            return newState;
        });
    }

    function get(key: string): classStoreObject {
        let itemValue: classStoreObject | undefined;
        classes.subscribe($classes => {
            itemValue = $classes[key];
        })();
        if (itemValue === undefined) {
            error(404, {
                message: 'Flot klaret, Key not found in the store'
            });
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

    return {
        ...classes,
        update,
        add,
        remove,
        get,
        getAll
    }
}