import { Liscence, Records } from "./profile";

export interface User {
    id: number;
    username: string;
    displayName: string;
    token: string;
    image?: string;
    liscence?: Liscence[];
    record?: Records[];
}

export interface UserFormValues {
    email: string;
    password: string;
    displayName?: string;
    username?: string;
}