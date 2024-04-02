<script lang="ts">
  import Button from "$lib/components/button.svelte";
  import Canvas from "$lib/components/canvas.svelte";
  import { faker } from '@faker-js/faker/locale/da';
  import { classes } from "$lib/stores/classes";
  import { associations } from "$lib/stores/associations";
  import { incrementer } from '$lib/stores/incrementer';
  import { classStoreObject } from '$lib/objects/classStoreObject';

  function handleClass(){
    incrementer.increment();
      let newClass = new classStoreObject(
        faker.person.firstName(), 
        ["Attributes"], 
        ["Methods"],
        0, 0,
        100,100,
        incrementer.getString()
      );
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

</script>

<div id="root" class="flex">
  <div class="bg-base-200 rounded-[15px] border-solid border-base-400 border-[5px] w-[263px] h-[428px] relative flex flex-col items-center justify-start">
    <Button name="Class" on:click={handleClass}/>
    <Button name="Prettify" on:click={handlePrettify}/>
  </div>
  <Canvas/>
</div>