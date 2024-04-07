import type { Dictionary } from "$lib/objects/dictionary";
import { faker } from '@faker-js/faker/locale/da';

export class xClass implements xClass {
    name: string;
    attributes: attribute;
    methods: method;
    x: number;
    y: number;
    width: number;
    height: number;
    private id: string;
    
    constructor(id: string, name?:string, attributes?:attribute, methods?:method, x?:number, y?:number, width?: number, height?: number){
        this.id = id;
        this.name = name ?? faker.person.firstName();
        this.attributes = attributes ?? {value: ['Attributes']};
        this.methods = methods ?? {value:['Methods']};
        this.x = x ?? 0;
        this.y = y ?? 0;
        this.width = width ?? 100;
        this.height = height ?? 100;
    }

    clone(): xClass{
        return new xClass(this.id, this.name, this.attributes, this.methods, this.x, this.y, this.width, this.height);
    }

    getId(): string {
        return this.id;
    }

    toJSON(){
        return{
            id: this.id,
            name: this.name,
            attributes: this.attributes,
            methods: this.methods,
            x: this.x,
            y: this.y,
            width: this.width,
            height: this.height,
        }
    }

    static fromJSON(json: any): xClass {
        return new xClass(json.id, json.name, json.attributes, json.methods, json.x, json.y,json.width,json.height);
    }

    static fromJSONString(json: string | null): Dictionary {
        let parsedData = json ? JSON.parse(json) : {};
        let deserializedDictionary: Dictionary = {};

        for (const key in parsedData) {
            deserializedDictionary[key] = xClass.fromJSON(parsedData[key]);
        }
        return deserializedDictionary;
    }
}