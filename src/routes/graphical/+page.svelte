<script lang="ts">
  import Button from "$lib/components/button.svelte";
  import Canvas from "$lib/components/canvas.svelte";
  import { classes } from "$lib/stores/classes";
  import { associations } from "$lib/stores/associations";
  import { incrementer } from '$lib/stores/incrementer';
  import { xClass } from '$lib/objects/xClass';
  import { focus } from '$lib/stores/focus'

  function handleClass(){
    incrementer.increment();
      let newClass = new xClass(incrementer.getString());
      classes.add(incrementer.getString(), newClass);
        
      console.log(classes.getAll());
  }
  async function handlePrettify(){

    let response = await fetch('api/graphviz/prettify',{
      method: 'Post',
      body: JSON.stringify({
          classes: classes.stringify(),
          associations: associations.stringify()
        }),
      headers: {
				'content-type': 'application/json',
			},
    });

    let {result} = await response.json();  
    console.log(result);

    classes.updateFromDotString(result)

  }

  function deleteClass(){
    classes.remove($focus);
    associations.deleteFromKey($focus);
  }

</script>

<div id="root" class="flex">
  <div class="bg-base-200 rounded-[15px] border-solid border-base-400 border-[5px] w-[263px] h-[428px] relative flex flex-col items-center justify-start">
    <Button name="Class" on:click={handleClass}/>
    <Button name="Prettify" on:click={handlePrettify}/>
    {#if $focus != '0'}
      <p class="text-center">Focus is on: {classes.get($focus).name}</p>
    {:else}
      <p class="text-center">There is no class in focus</p>
    {/if}
    {#if $focus != '0'}
      <Button name='Delete {classes.get($focus).name}' on:click={deleteClass}/>
    {:else}
      <p class="text-center">Press a class name to focus</p>
    {/if}

  </div>
  <Canvas/>
</div>