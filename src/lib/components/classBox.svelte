<script>
    import Draggable from "./draggable.svelte";
    let title = "Title";
    let attributes = "Attribute";
    let methods = "Methods";
    let triangleWidth = 100;
    let triangleHeight = 100;

    function titlehandleclick() {
        title = prompt("Enter the title of the class");
    }
    function attributeshandleclick() {
        attributes = prompt("Enter the attributes of the class");
    }
    function methodshandleclick() {
        methods = prompt("Enter the methods of the class");
    }
    
</script>

<Draggable>
    <svg  width={triangleWidth} height={triangleHeight}>
        <rect x="0" y="0" width={triangleWidth} height={triangleHeight} fill="none" stroke="black" stroke-width="2" rx="10" ry="10" />
        <g on:click={titlehandleclick}>
            <text x="50" y="20" text-anchor="middle" font-size="16" font-weight="bold">{title}</text>
        </g>
        <line x1="0" y1="30" x2="100" y2="30" stroke="black" stroke-width="2" />
        <g on:click={attributeshandleclick}>
            <text x="50" y="50" text-anchor="middle" font-size="16" font-weight="bold">{attributes}</text>
        </g>
        <line x1="0" y1="70" x2="100" y2="70" stroke="black" stroke-width="2" />
        <g on:click={methodshandleclick}>
            <text x="50" y="90" text-anchor="middle" font-size="16" font-weight="bold">{methods}</text>
        </g>
    </svg>
</Draggable>