<script lang="ts">
    import TextAreaInput from "$lib/components/textAreaInput.svelte";

    let diagramText: string = "";

    function extractLines(textBlock: string): string[] {
        
        return textBlock.split('\n')
                  .filter(line => line.trim() !== '' && line.trim() !== '}')
                  .map(line => {
                    if (line.startsWith("\"") && line.endsWith("\"")) {
                      line = line.substring(1, line.length - 1);
                    }
                    return line;
                  });
    }

    function extractClass(classText: string) {
        
        let classNameRegex: RegExp = /class:\s*(\w+)/;
        let classNameMatch = classText.match(classNameRegex);
        let className: string = classNameMatch ? classNameMatch[1] : "Title";

        // Splitting the class text into attributes and methods
        let [_, atSection, meSection] = classText.split(/(?:\n\s*at:\s*\n|\n\s*me:\s*\n)/);
        let attributes: string[] = atSection ? extractLines(atSection) : [];
        let methods: string[] = meSection ? extractLines(meSection) : [];

        return {
            className,
            attributes,
            methods
        };
    }

    function consoleLogProcessedInput() {
        
        // Split the entire text by class definitions
        let classRegex: RegExp = /class:\s*\w+\s*{[\s\S]*?}\n?/g;
        let classMatches = [...diagramText.matchAll(classRegex)];

        let classes = classMatches.map(match => extractClass(match[0]));

        console.log(classes);
    }

    function createDiagram() {
        consoleLogProcessedInput();
    }

</script>

<div class="flex flex-row relative top-0 left-0">
    <TextAreaInput bind:textArea={diagramText} on:click={createDiagram}/>
</div>