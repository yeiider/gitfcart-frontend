import { NextResponse } from "next/server";

export async function POST(request: Request) {
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
    const response = NextResponse.redirect(`${baseUrl}/login`);

    // Eliminar cookies
    response.cookies.delete("jwt");
    response.cookies.delete("user");

    try {
        const apiResponse = await fetch(`${process.env.URL_BACKEND}api/auth/logout`, {
            method: "POST",
            credentials: "include",
        });

        if (!apiResponse.ok) {
            console.error("Error cerrando sesión en el servidor:", await apiResponse.text());
        }
    } catch (error) {
        console.error("Error al cerrar sesión en el backend:", error);
    }

    return response;
}
