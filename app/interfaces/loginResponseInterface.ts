import {User} from "@/app/interfaces/userInterface";

export interface LoginResponseInterface {
    jwt: string;
    data: User
}

export interface CreateResponseInterface {
    jwt: string;
    user: User
}