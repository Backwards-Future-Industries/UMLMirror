<script>
  import ClassButton from "$lib/components/classButton.svelte";

  let width = 1000;
  let height = 1000;


  function handleClick(){
    document.getElementById('diagram').innerHTML += `
    <svg class="draggable">
      <rect x="0" y="0" width="100" height="100" fill="none" stroke="black" stroke-width="2" rx="10" ry="10" />
      <g>
        <text x="50" y="20" text-anchor="middle" font-size="16" font-weight="bold">Title</text>
      </g>
      <line x1="0" y1="30" x2="100" y2="30" stroke="black" stroke-width="2" />
      <g>
        <text x="50" y="50" text-anchor="middle" font-size="16" font-weight="bold">Attribute</text>
      </g>
      <line x1="0" y1="70" x2="100" y2="70" stroke="black" stroke-width="2" />
      <g>
        <text x="50" y="90" text-anchor="middle" font-size="16" font-weight="bold">Methods</text>
      </g>
    </svg>
    `;
  }
</script>

<div class="flex">
  <div class="bg-base-200 rounded-[15px] border-solid border-base-400 border-[5px] w-[263px] h-[428px] relative flex flex-col items-center justify-start">
    <ClassButton on:click={handleClick} />
  </div>
  <svg id="diagram" class="flex" width={width} height={height}>

  </svg>
</div>