import { writable, type Updater } from 'svelte/store';
import { xClass } from '$lib/objects/xClass';
import { error } from '@sveltejs/kit';
import { browser } from '$app/environment';
import { incrementer } from './incrementer';
import type { Dictionary } from '$lib/objects/dictionary';
import { associations } from './associations';

const initialvalue: Dictionary = getDictionary();

export const classes = createClasses(initialvalue);

function getDictionary(): Dictionary {
    let rawData: string | null = null;
    if (browser) {
        rawData = window.localStorage.getItem('classes');
    }
    let deserializedDictionary = xClass.fromJSONString(rawData);
    incrementer.set(Object.keys(deserializedDictionary).length);
    return deserializedDictionary;
}

function createClasses(initialValue: Dictionary){
    
    const classes = writable<Dictionary>(initialValue);

    function add(key: string, value: xClass): void {
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

    function get(key: string): xClass {
        let itemValue: xClass | undefined;
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

    function replace(key: string, value: xClass): void {
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

    function stringify(): string {
        return JSON.stringify(getAll(),null,1);
    }

    function save(): void {
        if (browser) {
            window.localStorage.setItem('classes', stringify());
        }
    }

    function updateFromDotString(dotString:string):void{
        let allLines = dotString.split('\n')

        let matchingLines = allLines.filter(line => line.includes('node'))
        
        for(let line of matchingLines){
            let lineSplit = line.split(/\s+/);
            let klasse = get(lineSplit[1]).clone()
            klasse.x = Number(lineSplit[2]) * 72
            klasse.y = Number(lineSplit[3]) * 72
            replace(klasse.getId(),klasse)
        }
    }

    return {
        ...classes,
        add,
        remove,
        get,
        getAll,
        replace,
        stringify,
        updateFromDotString,
        save
    }
}