import { writable} from 'svelte/store';
import { xAssociation } from '$lib/objects/xAssociation';
import { error } from '@sveltejs/kit';
import { browser } from '$app/environment';

const initialvalue: xAssociation[] = getArray();

export const associations = createAssociations(initialvalue);

function getArray(): xAssociation[] {
    let rawData: string | null = null;
    if (browser) {
        rawData = window.localStorage.getItem('associations');
    }
    
    return xAssociation.fromJSONString(rawData);
}

function createAssociations(initialValue: xAssociation[]){
    
    const { subscribe, update } = writable<xAssociation[]>(initialValue);

    function add(value: xAssociation): void {
        update(current => ([...current, value ]));
        save();
    }

    function remove(index: number): void {
        update(current => {
            const newState = [...current ];
            newState.splice(index, 1);
            return newState;
        });
        save();
    }

    function removeAll():void{
        update(current => {
            return [];
        });
        save();
    }

    function get(index: number): xAssociation {
        let association: xAssociation | undefined;
        associations.subscribe($associations => {
            association = $associations[index];
        })();
        if (association === undefined) {
            error(404, `Flot klaret. Key ${index} not found in the store. ${JSON.stringify(getAll())}`);
        }
        return association;
    }
    
    function getAll(): xAssociation[] {
        let allValues: xAssociation[] = [];
        associations.subscribe($associations => {
            allValues = $associations;
        })();
        return allValues;
    }

    function stringify(): string {
        return JSON.stringify(getAll())
    }

    function save(): void {
        if (browser) {
            window.localStorage.setItem('associations',stringify());
        }
    }

    function deleteFromKey(key: string): void {
        update(current => {
            const newState = current.filter((item) => item.from !== key && item.to !== key);
            return newState;
        });
        save();
    }

    function updateFromDotString(dotString:string):void{
        let allLines = dotString.split('\n')

        let matchingLines = allLines.filter(line => line.includes('edge'))
        
        removeAll()
        
        for(let line of matchingLines){
            let lineSplit = line.split(/\s+/);
            
            let from = lineSplit[1]
            let to = lineSplit[2]

            add(new xAssociation(from,to))
        }
        save()
    }

    return {
        subscribe,
        add,
        remove,
        get,
        getAll,
        stringify,
        deleteFromKey,
        updateFromDotString
    }
}