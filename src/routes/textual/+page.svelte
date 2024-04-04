<script lang="ts">
    import TextAreaInput from "$lib/components/textAreaInput.svelte";

    let diagramText: string =  "class: Person {" +
    "\nat:"+
    "\n\"- name: String\"" +
    "\n\"- age: int\"" +
    "\nme:"+
    "\n\"+ getName(): String\"" +
    "\n\"+ getAge(): int\"" +
    "\n}";

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
        const classNameRegex: RegExp = /class:\s*(\w+)/;
        const classNameMatch = classText.match(classNameRegex);
        const className: string | null = classNameMatch ? classNameMatch[1] : null;

        // Splitting the class text into attributes and methods
        const [_, atSection, meSection] = classText.split(/(?:\n\s*at:\s*\n|\n\s*me:\s*\n)/);
        const attributes: string[] = atSection ? extractLines(atSection) : [];
        const methods: string[] = meSection ? extractLines(meSection) : [];

        return {
            className,
            attributes,
            methods
        };
    }

    function consoleLogProcessedInput() {
        // Split the entire text by class definitions
        const classRegex: RegExp = /class:\s*\w+\s*{[\s\S]*?}\n?/g;
        const classMatches = [...diagramText.matchAll(classRegex)];

        const classes = classMatches.map(match => extractClass(match[0]));

        console.log(classes);
    }


    function createDiagram() {
        consoleLogProcessedInput();
    }

</script>

<div class="flex flex-row relative top-0 left-0">
    <TextAreaInput bind:textArea={diagramText} on:click={createDiagram}/>
    <div>test</div>
</div>