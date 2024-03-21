import { writable, type Updater } from 'svelte/store';
import { classStoreObject } from '$lib/objects/classStoreObject';
import { error } from '@sveltejs/kit';

interface Dictionary {
    [key: string]: classStoreObject;
}

export const classes = createClasses();

function createClasses(){
    
    const classes = writable<Dictionary>({});

    function add(key: string, value: classStoreObject): void {
        classes.update(current => ({ ...current, [key]: value }));
    }

    function remove(key: string): void {
        classes.update(current => {
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