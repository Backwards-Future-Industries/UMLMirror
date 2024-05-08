<script>
  import TextAreaInput from "$lib/components/higherLevel/textAreaInput.svelte";
  import Canvas from "$lib/components/higherLevel/canvas.svelte";
  import ToolBar from "$lib/components/higherLevel/toolBar.svelte";
  import { handlePrettify } from "$lib/logic/graphvizLogic";
  import { classFocus,associationFocus } from '$lib/stores/focuses'
  import { classTextArea, associationTextArea } from "$lib/stores/textAreas";
  import { TextGenerator } from "$lib/logic/textGeneratorLogic";


  function handleTextAreaUpdate() {
    classTextArea.set(TextGenerator.getInstance().generateClassText());
    associationTextArea.set(TextGenerator.getInstance().generateAssociationText());
  }


  if (classFocus != '0' || associationFocus != -1) {
    handleTextAreaUpdate();
  }
  

</script>

<div class="flex flex-row relative top-0 left-0">
  <TextAreaInput on:updateDraw={handlePrettify}/>
  <Canvas/>
  <ToolBar/>
</div>