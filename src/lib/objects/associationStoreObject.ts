export class associationStoreObject {
    id1: string;
    id2: string;
    
    constructor(id1: string, id2: string){
        this.id1 = id1;
        this.id2 = id2;
        
    }

    toJSON(){
        return{
            id1: this.id1,
            id2: this.id2
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