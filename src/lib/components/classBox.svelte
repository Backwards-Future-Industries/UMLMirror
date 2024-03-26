<svelte:options accessors/>
<script lang="ts">
    import { classStoreObject } from '$lib/objects/classStoreObject';
    import { createEventDispatcher } from 'svelte';
    import { classes } from '$lib/stores/classes';
    
    const dispatch = createEventDispatcher();
    
    export let s: classStoreObject;

    let width = 100;
    let height = 100;
    let moving = false;
	
	function onMouseDown() {
		moving = true;
        focus();
	}
	
	function onMouseMove(e: MouseEvent) {
		if (moving) {
			s.x += e.movementX;
			s.y += e.movementY;
            classes.replace(s.getId(), s)
		}
	}
	
	function onMouseUp() {
		moving = false;
	}

    function clicked() {
        dispatch('clicked', {
            id: s.getId()
        });
    }

</script>


<!-- svelte-ignore a11y-no-static-element-interactions -->
<!-- svelte-ignore a11y-click-events-have-key-events -->
<svg>
    <rect x={s.x} y={s.y} width={width} height={height} on:mousedown={onMouseDown} fill="none" stroke="black" stroke-width="2" rx="10" ry="10" class=" hover:cursor-move" />
    <g>
        <text on:click={clicked} x={s.x+50} y={s.y+20} text-anchor="middle" font-size="16" font-weight="bold">{s.title}</text>
    </g>
    <line x1={s.x} y1={s.y+30} x2={s.x+100} y2={s.y+30} stroke="black" stroke-width="2" />
    <g>
        <text x={s.x+50} y={s.y+50} text-anchor="middle" font-size="16" font-weight="bold">{s.attributes}</text>
    </g>
    <line x1={s.x} y1={s.y+70} x2={s.x+100} y2={s.y+70} stroke="black" stroke-width="2" />
    <g>
        <text x={s.x+50} y={s.y+90} text-anchor="middle" font-size="16" font-weight="bold">{s.methods}</text>
    </g>
</svg>

<svelte:window on:mouseup={onMouseUp} on:mousemove={onMouseMove} />