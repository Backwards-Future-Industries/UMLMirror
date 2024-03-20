import { writable } from "svelte/store";

export function createIncrementer(){
    
    const incrementer = writable<number>(0);

    function increment(): void {
        incrementer.update((current) => current + 1);
    }

    function decrement(): void {
        incrementer.update((current) => current - 1);
    }

    function set(value: number): void {
        incrementer.update(() => value);
    }

    return {
        ...incrementer,
        increment,
        decrement,
        set
    }
}