export class associationStoreObject {
    from: string;
    to: string;
    
    constructor(id1: string, id2: string){
        this.from = id1;
        this.to = id2;
        
    }

    toJSON(){
        return{
            from: this.from,
            to: this.to
        }
    }

    static fromJSON(json: any): associationStoreObject {
        return new associationStoreObject(json.from, json.to);
    }

    static fromJSONString(json: string | null): associationStoreObject[] {
        let parsedData: associationStoreObject[]  = json ? JSON.parse(json) : [];
        
        return parsedData.map((item: any) => associationStoreObject.fromJSON(item));
    }
}