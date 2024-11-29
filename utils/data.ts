import Cookies from "js-cookie";
import {User} from "@/app/interfaces/userInterface";

export const getToken = (): string | null => {
    const token = document.cookie.split("; ").find((c) => c.startsWith("jwt="));
    console.log(document.cookie)
    return token ? token.split("=")[1] : null;
};


export const getUser = (): User | null => {
    const userCookie = document.cookie.split('; ').find(c => c.startsWith('user='));
    if (userCookie) {
        return JSON.parse(decodeURIComponent(userCookie.split('=')[1]));
    }

    return null

};