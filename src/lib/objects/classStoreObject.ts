import type { Dictionary } from "$lib/objects/dictionary";

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

    clone(): classStoreObject{
        return new classStoreObject(this.title, this.attributes, this.methods, this.x, this.y, this.width, this.height, this.id);
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

    static fromJSONString(json: string | null): Dictionary {
        let parsedData = json ? JSON.parse(json) : {};
        let deserializedDictionary: Dictionary = {};

        for (const key in parsedData) {
            deserializedDictionary[key] = classStoreObject.fromJSON(parsedData[key]);
        }
        return deserializedDictionary;
    }
}