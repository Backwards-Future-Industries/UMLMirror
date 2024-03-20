export class classStoreObject {
    title: string;
    attributes: string[];
    methods: string[];
    x: number;
    y: number;
    private id: string;
    
    constructor(title: string = "Title", attributes: string[] = ["attributes"], methods: string[] = ["methods"], x: number = 0, y: number = 0, id: string){
        this.title = title;
        this.attributes = attributes;
        this.methods = methods;
        this.x = x;
        this.y = y;
        this.id = id;
    }

    getId(): string {
        return this.id;
    }
}