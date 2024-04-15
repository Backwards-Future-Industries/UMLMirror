<script lang="ts">

    export let classArea: string =  '';
    export let associationArea: string = '';

    function handleTab(e: KeyboardEvent) {
        if (e.key === "Tab") {
            e.preventDefault();
            let start = this.selectionStart;
            let end = this.selectionEnd;

            this.value = this.value.substring(0, start) + "\t" + this.value.substring(end);
            this.selectionStart = this.selectionEnd = start + 1;
        }
    }

</script>

<div class="flex flex-col h-screen">
    <textarea on:keydown={handleTab} id="classText" class="resize-none w-96 bg-base-200 pl-3 pt-2 pr-3 font-mono flex-grow h-3/4" spellcheck="false" bind:value={classArea}/>
    <textarea on:keydown={handleTab} id="associationText" class="resize-none w-96 bg-base-200 pl-3 pt-2 pr-3 font-mono flex-grow h-1/4" spellcheck="false" bind:value={associationArea}/> 
</div>