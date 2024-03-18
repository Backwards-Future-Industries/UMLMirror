<script>
  import ClassButton from "$lib/components/classButton.svelte";
  import Canvas from "$lib/components/canvas.svelte";
  
  let canvas;

  function handleClick(){
      canvas.handleClick();
  }
</script>

<div id="root" class="flex">
  <div class="bg-base-200 rounded-[15px] border-solid border-base-400 border-[5px] w-[263px] h-[428px] relative flex flex-col items-center justify-start">
    <ClassButton on:click={handleClick}/>
  </div>
  <Canvas bind:this={canvas}/>
</div>