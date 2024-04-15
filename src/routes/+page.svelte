<script>
    let sampleClass = {
        "name": "Person",
        "attributes": {
        "value": [
            "- name:String"
        ]
        },
        "methods": {
        "value": [
            "+ getName():String"
        ]
        },
        "id": "1"
    }

    let prettyClass = JSON.stringify(sampleClass, null, 1);

    let sampleAssociation = {
        "from": "1",
        "to": "2"
    }

    let prettyAssociation = JSON.stringify(sampleAssociation);
</script>

<div class="flex flex-row pl-5 pt-5"> 
    <div class="flex flex-col w-1/2">
        <h1 class="font-bold text-4xl py-2">UMLMirror user guide</h1>
        <h2 class="font-bold text-3xl py-2">Introduction</h2>
        <div class="w-7/12">UMLMirror is a class diagram creation tool, 
            that aims to bridge the gap between drawing-based diagram tools, 
            such as draw.io and textual tools, such as PlantUML, 
            resulting in system where both can be used interchangeably.</div>
        <h2 class="font-bold text-3xl py-2 pt-4">How to use</h2>
        <div class="flex flex-row">
            <div id="graphical" class="flex flex-col pr-4">
                <h3 class="font-bold text-2xl py-2">Graphical</h3>
                <div class="font-bold py-1">Creating a class</div>
                <div>To create a class simply press the class button, this will create a class
                    with a randomly generated name and some filler methods. </div>
                <div class="font-bold py-1">Interacting with a class</div>
                <div>To move a class simply press and hold on the border or the blank white space.</div>
                <div>To edit the contents of the class simply double click on either the
                name, attributes or methods. This will open a text area you can interact with. </div>
                <div>To delete a class, click on its name, and then press the delete button in the panel on the left.</div>
                <div class="font-bold py-1">Creating associations</div>
                <div>To create an association, press the name of a class and then the name of another class.
                    This will determine the direction of the arrow. Arrowheads are currently not implemented, 
                    but arrow direction is still accounted for.</div>
            </div>
        </div>
    </div>
    <div id="textual"class="flex flex-col w-1/2 pl-4">
        <h3 class="font-bold text-2xl py-2">Textual</h3>
        <div class="font-bold py-1">Creating a class</div>
        <div>The textual input works by parsing JSON, looking for the following fields: </div>
        <div class="font-mono">'name','id','attributes' & 'methods'</div>
        <div>The first two are strings, whilst the latter two are arrays[] of strings, 
            classes are written in the top text area,
            an example of a simple class can be seen below:</div>
        <pre><code>{prettyClass}</code></pre>
        <div class="font-bold py-1">Creating an association</div>
        <div>Associations are created using the Ids of the classes, 
            via a simple "to" and "from" format, 
            associations are written in the bottom text area,
            an example can be seen below:</div>
        <pre><code>{prettyAssociation}</code></pre>
        <div class="font-bold py-1">Updating the diagram with new classes or associations</div>
        <div>To update the diagram, simply press the "Update diagram" button at the buttom of the page.</div>
    </div>
</div>