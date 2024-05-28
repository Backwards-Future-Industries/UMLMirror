<script lang="ts">
    import { createEventDispatcher } from 'svelte';

    const dispatch = createEventDispatcher();

    export let text: string = ''
    export let title: string = ''
    let textArea: HTMLTextAreaElement

    function handleTab(e: KeyboardEvent) {
        if (e.key === "Tab") {
            e.preventDefault();
            let start = textArea.selectionStart;
            let end = textArea.selectionEnd;

            textArea.value = textArea.value.substring(0, start) + "\t" + textArea.value.substring(end);
            textArea.selectionStart = textArea.selectionEnd = start + 1;
        };
    }
    function textchanged() {
        dispatch('textChange', {});
    }

</script>

<h2 class="text-2xl font-bold text-center bg-base-400 p-1">{title}</h2>
<textarea on:keydown={handleTab} id="classText" class="resize-none w-96 h-full bg-base-200 pl-3 pt-2 pr-3 font-mono flex-grow border-2 border-r-2 rounded" spellcheck="false" bind:this={textArea} bind:value={text} on:change={textchanged}/>