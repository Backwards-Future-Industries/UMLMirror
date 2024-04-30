<script lang="ts">
  import Button from "$lib/components/button.svelte";
  import Canvas from "$lib/components/canvas.svelte";
  import { classes } from "$lib/stores/classes";
  import { associations } from "$lib/stores/associations";
  import { incrementer } from '$lib/stores/incrementer';
  import { xClass } from '$lib/objects/xClass';
  import { classFocus,associationFocus } from '$lib/stores/focuses'
  import { handlePrettify } from "$lib/logic/graphvizLogic";

  function handleClass(){
    incrementer.increment();
      let newClass = new xClass(incrementer.getString());
      classes.add(incrementer.getString(), newClass);
        
      console.log(classes.getAll());
  }

  function deleteClass(){
    classes.remove($classFocus);
    associations.deleteFromKey($classFocus);
  }
  function deleteAssociation(){
    associations.remove($associationFocus)
    associationFocus.set(-1)
  }

</script>

<div id="root" class="flex">
  <div class="bg-base-200 rounded-[15px] border-solid border-base-400 border-[5px] w-[263px] h-[428px] relative flex flex-col items-center justify-start">
    <Button name="Class" on:click={handleClass}/>
    <Button name="Prettify" on:click={handlePrettify}/>
    {#if $classFocus == '0' && $associationFocus == -1}
      <p class="text-center">There is nothing in focus</p>
      <p class="text-center">Press an element to focus</p>
    {/if}
    {#if $classFocus != '0'}
      <p class="text-center">{classes.get($classFocus).name} is highlighted</p>
      <Button name='Delete {classes.get($classFocus).name}' on:click={deleteClass}/>
    {/if}
    {#if $associationFocus != -1}
    <p class="text-center">
      Association from {classes.get($associations[$associationFocus].from).name} to {classes.get($associations[$associationFocus].to).name} is highlighted 
    </p>
    <Button name='Delete this association' on:click={deleteAssociation}/>
    {/if}


  </div>
  <Canvas/>
</div>