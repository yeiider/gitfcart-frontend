import { NextResponse } from "next/server";
import { loginWithRest } from "@/lib/useAuth";

export async function POST(request: Request) {
    try {
        const { identifier, password } = await request.json();
        const data = await loginWithRest(identifier, password);
        const { jwt, user } = data;
        const response = NextResponse.json({ message: "Login successful", user: user });
        response.cookies.set("jwt", jwt, {path: "/", httpOnly: true, secure: process.env.NODE_ENV === "production",});

        return response;
    } catch (error) {
        console.error("Error en el login:", error);
        return NextResponse.json(
            { message: error instanceof Error ? error.message : "Error interno del servidor" },
            { status: 500 }
        );
    }
}
