import { writable } from 'svelte/store';
import { TextGenerator } from '$lib/logic/textGeneratorLogic';

export const classTextArea = writable('');
export const associationTextArea = writable('');

export function updateClassTextArea() {
    classTextArea.set(TextGenerator.getInstance().generateClassText());
}

export function updateAssociationTextArea() {
    associationTextArea.set(TextGenerator.getInstance().generateAssociationText());
}