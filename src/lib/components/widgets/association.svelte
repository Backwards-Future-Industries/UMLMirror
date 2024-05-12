<script lang="ts">
    import { classes } from '$lib/stores/classes';
    import { associationFocus } from '$lib/stores/focuses';

    export let fromID: string;
    export let toID: string;
    export let id: number
    
    $: from = $classes[fromID]
    $: to = $classes[toID]

    $: fromHalfWidth = (from.getWidth()+4)/2
    $: fromHalfHeigth = (from.getHeight()+4)/2
    $: fromCenterX = from.x + fromHalfWidth
    $: fromCenterY = from.y + fromHalfHeigth

    $: toHalfWidth = (to.getWidth())/2
    $: toHalfHeigth = (to.getHeight())/2
    $: toCenterX = to.x + toHalfWidth
    $: toCenterY = to.y + toHalfHeigth

    $: deltaX = Math.round(toCenterX - fromCenterX)
    $: deltaY = Math.round(toCenterY - fromCenterY)

    $:fromCoordinates = getIntersection(deltaX, deltaY, fromCenterX, fromCenterY, fromHalfWidth, fromHalfHeigth)
    $:toCoordinates = getIntersection(-deltaX, -deltaY, toCenterX, toCenterY, toHalfWidth, toHalfHeigth)

    function setfocus(){
        associationFocus.set(id)
    }

    function unfocus(){
        associationFocus.set(-1)
    }

    //https://stackoverflow.com/a/50261758
    function getIntersection(deltaX:number, deltaY:number, centerX:number, centerY:number, halfW:number, halfH:number):number[]{
        if (Math.abs(deltaY / deltaX) < halfH / halfW) {
            // Hit vertical edge
            return [centerX + (deltaX > 0 ? halfW : -halfW), centerY + deltaY * halfW / Math.abs(deltaX)];
        } else {
            // Hit horizontal edge
            return [centerX + deltaX * halfH / Math.abs(deltaY), centerY + (deltaY > 0 ? halfH : -halfH)];
        }
    }

</script>

<!-- svelte-ignore a11y-no-static-element-interactions -->
<!-- svelte-ignore a11y-click-events-have-key-events -->
<svg>
    <defs>
        <marker
            id="head"
            viewBox="0 0 10 10"
            refX="5"
            refY="5"
            fill={$associationFocus==id ? "mediumslateblue":"black"}
            markerWidth="6"
            markerHeight="6"
            orient="auto-start-reverse">
            <path d="M 0 0 L 10 5 L 0 10 z" />
        </marker>
    </defs>
    <path 
        d="M{fromCoordinates[0]},{fromCoordinates[1]} {toCoordinates[0]},{toCoordinates[1]}"
        marker-end="url(#head)"
        stroke={$associationFocus==id ? "mediumslateblue":"black"} 
        stroke-width="2" 
        on:click|stopPropagation={setfocus} 
        class=" hover:cursor-pointer"/>
</svg>

<svelte:window on:click={unfocus}/>