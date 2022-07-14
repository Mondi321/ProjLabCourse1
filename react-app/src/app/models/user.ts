import { Review } from "./review";
import { Rezervimi } from "./rezervimi";

export interface User {
    id?: string;
    username: string;
    displayName: string;
    token: string;
    image?: string;
    rezervimet?: Rezervimi[];
    photo?: Photo;
    reviews?: Review[];
}

export interface UserFormValues{
    email: string;
    password: string;
    displayName?: string;
    username?:string;
}

export interface Photo{
    id: string;
    url: string;
    appUserId?: string;
}