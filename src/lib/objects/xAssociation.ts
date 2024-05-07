export class xAssociation implements association {
    from: string;
    to: string;
    controlPoints: string[]
    
    constructor(from: string, to: string, controlPoints?: string[]){
        this.from = from;
        this.to = to;
        this.controlPoints = controlPoints?? ['']
    }

    toJSON(){
        return{
            from: this.from,
            to: this.to,
            controlPoints: this.controlPoints
        }
    }

    static fromJSON(json: any): xAssociation {
        return new xAssociation(json.from, json.to, json.controlPoints);
    }

    static fromJSONString(json: string | null): xAssociation[] {
        let parsedData: xAssociation[]  = json ? JSON.parse(json) : [];
        
        return parsedData.map((item: any) => xAssociation.fromJSON(item));
    }
}