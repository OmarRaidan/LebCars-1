
import { User } from "./user";

export interface Profile {
    id: number;
    username: string;
    displayName: string;
    image?: string;
    age?: string;
    gender?: string;
    carModel?: string;
    carNumber?: string;
    phoneNumber?: string;
    followersCount: number;
    followingCount: number;
    following: boolean;
    bio?: string;
    photos?: Photo[];
    driverLiscences?: Liscence[];
    criminalRecords?: Records[];
}

export class Profile implements Profile {
    constructor(user: User) {
        this.id = user.id;
        this.username = user.username;
        this.displayName = user.displayName;
        this.image = user.image;
        this.driverLiscences = user.liscence;
    }
}

export interface Photo {
    id: string;
    url: string;
    isMain: boolean;
}

export interface UserRide {
    id: string;
    departure: string;
    destination: string;
    departureDate: Date;
    returnDate: Date;
}

export interface Liscence {
    id: string;
    url: string;
}

export interface Records{
    id: string;
    url: string;
}