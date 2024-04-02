export class associationStoreObject {
    from: string;
    to: string;
    
    constructor(id1: string, id2: string){
        this.from = id1;
        this.to = id2;
        
    }

    toJSON(){
        return{
            id1: this.from,
            id2: this.to
        }
    }

    static fromJSON(json: any): associationStoreObject {
        return new associationStoreObject(json.id1, json.id2);
    }

    static fromJSONString(json: string | null): associationStoreObject[] {
        let parsedData: associationStoreObject[]  = json ? JSON.parse(json) : [];
        
        return parsedData.map((item: any) => associationStoreObject.fromJSON(item));
    }
}