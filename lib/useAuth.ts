import {LoginResponseInterface} from "@/app/interfaces/loginResponseInterface";

export async function loginWithRest(email: string, password: string): Promise<LoginResponseInterface> {
    const url = 'http://127.0.0.1:1337/api/auth/local';

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

    const data: LoginResponseInterface = await response.json();

    document.cookie = `jwt=${data.jwt}; Path=/; HttpOnly; Secure`;

    return data;
}


export async function isLoggedInServer(req) {
    const token = req.headers.get("cookie")?.split(";").find((c) => c.trim().startsWith("jwt="));
    if (!token) {
        return null;
    }

    const jwt = token.split("=")[1];
    try {

        const response = await fetch(`http://127.0.0.1:1337/api/users/me`, {
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
        const response = await fetch(`http://127.0.0.1:1337/api/users/me`, {
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

export function sessionToken(req) {
    const token = req.headers.get("cookie")?.split(";").find((c) => c.trim().startsWith("jwt="));
    if (!token) {
        return null;
    }
    return token.split("=")[1];
}

export async function logout() {

    document.cookie = "jwt=; Path=/; Expires=Thu, 01 Jan 1970 00:00:00 UTC; Secure; HttpOnly";
    document.cookie = "user=; Path=/; Expires=Thu, 01 Jan 1970 00:00:00 UTC; Secure";

    try {
        const response = await fetch('http://127.0.0.1:1337/api/auth/logout', {
            method: 'POST',
            credentials: 'include',
        });

        if (!response.ok) {
            console.error("Error cerrando sesión en el servidor:", await response.text());
        }
    } catch (error) {
        console.error("Error al cerrar sesión:", error);
    }
}