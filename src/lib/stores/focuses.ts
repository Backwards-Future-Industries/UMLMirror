import { writable } from 'svelte/store';

export const classFocus = writable<string>("0");

export const associationFocus = writable<number>(-1);

