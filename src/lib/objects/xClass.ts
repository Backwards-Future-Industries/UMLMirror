import type { Dictionary } from "$lib/objects/dictionary";
import { faker } from '@faker-js/faker/locale/da';

export class xClass implements xClass {
    name: string;
    attributes: attribute;
    methods: method;
    x: number;
    y: number;
    private width: number;
    private height: number;
    private id: string;
    
    constructor(id: string, name?:string, attributes?:attribute, methods?:method, x?:number, y?:number, width?: number, height?: number){
        this.id = id;
        this.name = name ?? faker.person.firstName();
        this.attributes = attributes ?? {value: ['+ attribute1:type','- attribute2:type']};
        this.methods = methods ?? {value:['+ operation1(params):returnType','- operation2(params)','- operation3(params)']};
        this.x = x ?? 0;
        this.y = y ?? 0;
        this.width = width ?? this.getWidth();
        this.height = height ?? this.getHeight();
    }

    clone(): xClass{
        return new xClass(this.id, this.name, this.attributes, this.methods, this.x, this.y, this.width, this.height);
    }

    getId(): string {
        return this.id;
    }

    getTotalLines(): number{
        return 1 + this.getAttributeLines() + this.getMethodLines()
    }

    getAttributeLines():number{
        return this.attributes.value.length
    }

    getMethodLines():number{
        return this.methods.value.length
    }

    getWidth(){
        let longestString = this.name.length

        this.attributes.value.forEach((value)=>{
            if(value.length > longestString){
                longestString = value.length
            }
        })
        this.methods.value.forEach((value)=>{
            if(value.length > longestString){
                longestString = value.length
            }
        })

        return longestString * 10
    }   

    getHeight(): number{
        return 20* this.getTotalLines()
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