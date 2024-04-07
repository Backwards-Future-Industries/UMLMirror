export class xAssociation implements association {
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

    static fromJSON(json: any): xAssociation {
        return new xAssociation(json.from, json.to);
    }

    static fromJSONString(json: string | null): xAssociation[] {
        let parsedData: xAssociation[]  = json ? JSON.parse(json) : [];
        
        return parsedData.map((item: any) => xAssociation.fromJSON(item));
    }
}