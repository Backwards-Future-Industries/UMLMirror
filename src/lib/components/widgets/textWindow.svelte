<script lang="ts">
    import { createEventDispatcher } from 'svelte';

    const dispatch = createEventDispatcher();

    export let text: string = ''
    export let title: string = ''

    function handleTab(e: KeyboardEvent) {
        if (e.key === "Tab") {
            e.preventDefault();
            let start = this.selectionStart;
            let end = this.selectionEnd;

            this.value = this.value.substring(0, start) + "\t" + this.value.substring(end);
            this.selectionStart = this.selectionEnd = start + 1;
        };
    }
    function textchanged() {
        dispatch('textChange', {});
    }

</script>

<h2 class="text-2xl font-bold text-center bg-base-400 p-1">{title}</h2>
<textarea on:keydown={handleTab} id="classText" class="resize-none w-96 h-full bg-base-200 pl-3 pt-2 pr-3 font-mono flex-grow border-2 border-r-2 rounded" spellcheck="false" bind:value={text} on:change={textchanged}/>