<script>
  import ClassButton from "$lib/components/classButton.svelte";
  import ClassBox from "$lib/components/classBox.svelte";

  let width = 1000
  let height = 1000;


  function handleClick(){
    let newClass = new ClassBox({
      target: document.getElementById('diagram'),
    });
    
  }
</script>

<div class="flex">
  <div class="bg-base-200 rounded-[15px] border-solid border-base-400 border-[5px] w-[263px] h-[428px] relative flex flex-col items-center justify-start">
    <ClassButton on:click={handleClick} />
  </div>
  <svg id="diagram" class="flex" width={width} height={height}>
  </svg>
</div>