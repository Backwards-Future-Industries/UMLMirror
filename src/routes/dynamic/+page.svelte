<script>
  import TextAreaInput from "$lib/components/higherLevel/textAreaInput.svelte";
  import Canvas from "$lib/components/higherLevel/canvas.svelte";
  import ToolBar from "$lib/components/higherLevel/toolBar.svelte";
  import { handlePrettify } from "$lib/scripts/APICalls";

</script>

<div class="flex flex-row relative top-0 left-0">
  <TextAreaInput on:updateDraw={handlePrettify}/>
  <Canvas/>
  <ToolBar/>
</div>