import { writable } from "svelte/store";

export const incrementer = createIncrementer();

function createIncrementer(){
    
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

    function getString(): string {
        let value: string = "LoL";
        incrementer.subscribe($incrementer => {
            value = $incrementer.toString();
        })();
        return value;
    }

    return {
        ...incrementer,
        increment,
        decrement,
        set,
        getString
    }
}