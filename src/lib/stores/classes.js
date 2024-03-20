import { writable } from 'svelte/store';

function createClasses() {
    const { subscribe, set, update } = writable([]);

    return {
        subscribe,
        set,
        update,
    }
}

export const classes = writable([]);