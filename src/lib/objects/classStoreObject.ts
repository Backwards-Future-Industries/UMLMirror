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

    toJSON(){
        return{
            title: this.title,
            attributes: this.attributes,
            methods: this.methods,
            x: this.x,
            y: this.y,
            id: this.id
        }
    }

    static fromJSON(json: any): classStoreObject {
        return new classStoreObject(json.title, json.attributes, json.methods, json.x, json.y, json.id);
    }
}