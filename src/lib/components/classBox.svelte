<svelte:options accessors/>
<script lang="ts">
    import {createEventDispatcher} from 'svelte';
    const dispatch = createEventDispatcher();
    
    export let title: string;
    export let attributes: string;
    export let methods: string;    
    export let x:  number;
    export let y: number;

    let width = 100;
    let height = 100;
    let moving = false;
	
	function onMouseDown() {
		moving = true;
        focus();
	}
	
	function onMouseMove(e: MouseEvent) {
		if (moving) {
			x += e.movementX;
			y += e.movementY;
		}
	}
	
	function onMouseUp() {
		moving = false;
	}

    function focus(){
        dispatch('focus', {title: title , coordinates: {x: x, y: y}});
    }

</script>


<!-- svelte-ignore a11y-no-static-element-interactions -->
<!-- svelte-ignore a11y-click-events-have-key-events -->
<svg>
    <rect x={x} y={y} width={width} height={height} on:mousedown={onMouseDown} fill="none" stroke="black" stroke-width="2" rx="10" ry="10" class=" hover:cursor-move" />
    <g>
        <text x={x+50} y={y+20} text-anchor="middle" font-size="16" font-weight="bold">{title}</text>
    </g>
    <line x1={x} y1={y+30} x2={x+100} y2={y+30} stroke="black" stroke-width="2" />
    <g>
        <text x={x+50} y={y+50} text-anchor="middle" font-size="16" font-weight="bold">{attributes}</text>
    </g>
    <line x1={x} y1={y+70} x2={x+100} y2={y+70} stroke="black" stroke-width="2" />
    <g>
        <text x={x+50} y={y+90} text-anchor="middle" font-size="16" font-weight="bold">{methods}</text>
    </g>
</svg>

<svelte:window on:mouseup={onMouseUp} on:mousemove={onMouseMove} />