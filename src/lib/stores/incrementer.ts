import { writable } from "svelte/store";

export const incrementer = createIncrementer();

function createIncrementer(){
    
    const { subscribe, update } = writable<number>(0);

    function increment(): void {
        update((current) => current + 1);
    }

    function decrement(): void {
        update((current) => current - 1);
    }

    function set(value: number): void {
        update(() => value);
    }

    function getString(): string {
        let value: string = "LoL";
        incrementer.subscribe($incrementer => {
            value = $incrementer.toString();
        })();
        return value;
    }

    return {
        subscribe,
        increment,
        decrement,
        set,
        getString
    }
}