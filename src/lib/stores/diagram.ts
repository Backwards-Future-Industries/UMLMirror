import { writable } from 'svelte/store';

export const diagram = writable<string>("<svg></svg>");