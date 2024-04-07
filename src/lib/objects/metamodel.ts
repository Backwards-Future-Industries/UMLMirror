interface data{
    value: string[]
}

interface attribute extends data{
}

interface method extends data{
}

interface xclass{
    name: string
    attributes: attribute
    methods: method
}

interface association{
    from: xclass
    to: xclass
}