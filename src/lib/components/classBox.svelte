<script>
    import { SVG, extend as SVGextend, Element as SVGElement } from '@svgdotjs/svg.js'
    import '@svgdotjs/svg.draggable.js'
    let title = "Title";
    let attributes = "Attribute";
    let methods = "Methods";
    let width = 100;
    let height = 100;


    var draw = SVG().addTo('body')
    var classBox = draw.addClass('classbox')
    classBox.draggable()
    
</script>

<svg id="classbox">
    <rect x="0" y="0" width={width} height={height} fill="none" stroke="black" stroke-width="2" rx="10" ry="10" />
    <g>
        <text x="50" y="20" text-anchor="middle" font-size="16" font-weight="bold">{title}</text>
    </g>
    <line x1="0" y1="30" x2="100" y2="30" stroke="black" stroke-width="2" />
    <g>
        <text x="50" y="50" text-anchor="middle" font-size="16" font-weight="bold">{attributes}</text>
    </g>
    <line x1="0" y1="70" x2="100" y2="70" stroke="black" stroke-width="2" />
    <g>
        <text x="50" y="90" text-anchor="middle" font-size="16" font-weight="bold">{methods}</text>
    </g>
</svg>


