import {LoginResponseInterface} from "@/app/interfaces/loginResponseInterface";
import {NextRequest} from "next/server";

export async function loginWithRest(email: string, password: string): Promise<LoginResponseInterface> {
    const url = `${process.env.URL_BACKEND}api/auth/local`
    const response = await fetch(url, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ identifier: email, password }),
    });

    if (!response.ok) {
        throw await response.json();
    }

    return await response.json();
}

export async function createWithRest(username: string , password:string , email:string , name:string , lastName:string , rut:string ): Promise<LoginResponseInterface> {


    const apiUrl = `${process.env.URL_BACKEND}api/auth/local/register`

    const body = {
        username,
        email,
        password,
        name,
        lastName,
        rut,
    }

    const response = await fetch(apiUrl, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
    });

    if (!response.ok) {
        throw await response.json();
    }

    return await response.json();
}

export async function isLoggedInServer(req:NextRequest) {
    const token = req.headers.get("cookie")?.split(";").find((c) => c.trim().startsWith("jwt="));
    if (!token) {
        return null;
    }

    const jwt = token.split("=")[1];
    try {

        const response = await fetch(`${process.env.URL_BACKEND}api/users/me`, {
            headers: {
                Authorization: `Bearer ${jwt}`,
            },
        });

        if (!response.ok) {
            return null;
        }

        return await response.json();
    } catch (error) {
        console.error("Error verificando el login:", error);
        return null;
    }
}

export async function isLoggedInClient() {
    if (typeof document === "undefined") {
        console.error("isLoggedInClient solo puede usarse en el cliente.");
        return null;
    }

    const cookies = document.cookie.split(";");
    const token = cookies.find((c) => c.trim().startsWith("jwt="));

    if (!token) {
        return null;
    }

    const jwt = token.split("=")[1]; // Extrae el token JWT
    try {
        const response = await fetch(`${process.env.URL_BACKEND}api/users/me`, {
            headers: {
                Authorization: `Bearer ${jwt}`,
            },
        });

        if (!response.ok) {
            return null;
        }

        return await response.json();
    } catch (error) {
        console.error("Error verificando el login en el cliente:", error);
        return null;
    }
}

export function sessionToken(req:NextRequest) {
    const token = req.headers.get("cookie")?.split(";").find((c) => c.trim().startsWith("jwt="));
    if (!token) {
        return null;
    }
    return token.split("=")[1];
}

