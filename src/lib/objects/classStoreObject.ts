export class classStoreObject {
    title: string;
    attributes: string[];
    methods: string[];
    x: number;
    y: number;
    
    constructor(title: string = "Title", attributes: string[] = ["attributes"], methods: string[] = ["methods"], x: number = 0, y: number = 0) {
        this.title = title;
        this.attributes = attributes;
        this.methods = methods;
        this.x = x;
        this.y = y;
    }
}