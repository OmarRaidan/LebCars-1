import { User } from "./user";


export interface CriminalRecords{
    photo ?: Records[];
    image?: string;
}
export class CriminalRecord implements CriminalRecord{
    constructor(user: User) {
        //this.image = user.record;  
    }
}

export interface Records{
    id: string;
    url: string;
}