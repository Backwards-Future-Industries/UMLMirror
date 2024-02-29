<script>
    import Draggable from "./draggable.svelte";
    let title = "Title";
    let attributes = "Attribute";
    let methods = "Methods";
</script>

<div>
    <Draggable>
        <div
        contenteditable="true" bind:textContent={title} class="rounded-tl-[10px] rounded-tr-[10px] border-solid border-[#000000] border-2 flex items-center justify-center">
        {title}
        </div>
        <div
            contenteditable="true" bind:textContent={attributes} class="border-solid border-[#000000] border-r-2 border-b-2 border-l-2">
            {attributes}
        </div>
        <div
            contenteditable="true" bind:textContent={methods} class="rounded-br-[10px] rounded-bl-[10px] border-solid border-[#000000] border-r-2 border-b-2 border-l-2">
            {methods}
        </div>
    </Draggable>
</div>