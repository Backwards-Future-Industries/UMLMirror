<script>
    import Draggable from "./draggable.svelte";
    let title = "Title";
    let attributes = "Attribute";
    let methods = "Methods";
    let triangleWidth = 100;
    let triangleHeight = 100;

    function edittext() {
        title = prompt("Enter the title");
        attributes = prompt("Enter the attributes");
        methods = prompt("Enter the methods");
    }
</script>

<Draggable>
    <svg  width={triangleWidth} height={triangleHeight}>
        <rect x="0" y="0" width={triangleWidth} height={triangleHeight} fill="none" stroke="black" stroke-width="2" rx="10" ry="10" />
        <text x="50" y="20" text-anchor="middle" font-size="16" font-weight="bold">{title}</text>
        <line x1="0" y1="30" x2="100" y2="30" stroke="black" stroke-width="2" />
        <text x="50" y="50" text-anchor="middle" font-size="16" font-weight="bold">{attributes}</text>
        <line x1="0" y1="70" x2="100" y2="70" stroke="black" stroke-width="2" />
        <text x="50" y="90" text-anchor="middle" font-size="16" font-weight="bold">{methods}</text>
    </svg>
</Draggable>