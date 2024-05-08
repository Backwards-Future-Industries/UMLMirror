<script lang="ts">
    import Button from "$lib/components/button.svelte";
    import { classes } from "$lib/stores/classes";
    import { associations } from "$lib/stores/associations";
    import { incrementer } from '$lib/stores/incrementer';
    import { xClass } from '$lib/objects/xClass';
    import { classFocus,associationFocus } from '$lib/stores/focuses'
    import { updateAssociationTextArea, updateClassTextArea } from "$lib/stores/textAreas";
    import { handlePrettify } from "$lib/logic/graphvizLogic";

    function handleClass(){
        incrementer.increment();
        let newClass = new xClass(incrementer.getString());
        classes.add(incrementer.getString(), newClass);
        updateClassTextArea();
    }
    function deleteClass(){
        classes.remove($classFocus);
        associations.deleteFromKey($classFocus);
        updateClassTextArea();
    }
    function deleteAssociation(){
        associations.remove($associationFocus)
        associationFocus.set(-1)
        updateAssociationTextArea();
    }
</script>

<div class="bg-base-200 rounded-[15px] border-solid border-base-400 border-[5px] w-[263px] h-[428px] relative flex flex-col items-center justify-start">
    <div class="m-3">
        <Button name="create new class" on:click={handleClass}/>
    </div>
    <div class="m-3">
        <Button name="Prettify" on:click={handlePrettify}/>
    </div>
    {#if $classFocus == '0' && $associationFocus == -1}
        <p class="text-center">There is nothing in focus</p>
        <p class="text-center">Press an element to focus</p>
    {/if}
    {#if $classFocus != '0'}
        <p class="text-center">{classes.get($classFocus).name} is highlighted</p>
        <div class="m-3">
            <Button name='Delete {classes.get($classFocus).name}' on:click={deleteClass}/>
        </div>
    {/if}
    {#if $associationFocus != -1}
    <p class="text-center">
        Association from {classes.get($associations[$associationFocus].from).name} to {classes.get($associations[$associationFocus].to).name} is highlighted 
    </p>
    <div class="m-3">
        <Button name='Delete this association' on:click={deleteAssociation}/>
    </div>
    {/if}
</div>