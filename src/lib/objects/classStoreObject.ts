export class classStoreObject {
    title: string;
    attributes: string[];
    methods: string[];
    x: number;
    y: number;
    width: number;
    height: number;
    private id: string;
    
    constructor(title = "Title", attributes = ["attributes"], methods = ["methods"], x = 0, y = 0, width = 100, height = 100, id: string){
        this.title = title;
        this.attributes = attributes;
        this.methods = methods;
        this.x = x;
        this.y = y;
        this.id = id;
        this.width = width;
        this.height = height;
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
            width: this.width,
            height: this.height,
            id: this.id
        }
    }

    static fromJSON(json: any): classStoreObject {
        return new classStoreObject(json.title, json.attributes, json.methods, json.x, json.y,json.width,json.height, json.id);
    }
}