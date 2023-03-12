import { User } from "./user";

export interface DriverLiscence{
    photo?: Liscence[];
    image?: string;
}

export class DriverLiscence implements DriverLiscence{
    constructor(user: User) {
        //this.image = user.liscence;   
    }
}
export interface Liscence {
    id: string;
    url: string;
}