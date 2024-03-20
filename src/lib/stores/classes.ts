import { writable, type Updater } from 'svelte/store';

export function createClasses(onchange?: (value: classStoreObject[]) => void){
    
    const classes = writable<classStoreObject[]>([]);
    
    function update(updater: Updater<classStoreObject[]>){
        classes.update((current) => {
            const newvalue = updater(current);
            if(onchange){
                onchange(newvalue);
            }
            return newvalue;
        });
    }

    return {
        ...classes,
        update
    }
}