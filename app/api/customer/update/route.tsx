import {NextResponse} from "next/server";
import {cookies} from "next/headers";
import {updateWithRest} from "@/lib/useAuth";
import {CreateResponseInterface, LoginResponseInterface} from "@/app/interfaces/loginResponseInterface";

export async function PUT(request: Request) {
    const cookieStore = cookies();
    const token = cookieStore.get("jwt")?.value;

    if (!token) {
        return NextResponse.json(
            {error: "No authentication token found"},
            {status: 401}
        );
    }

    try {
        const body = await request.json();

        const {name, lastName, email, rut, documentId} = body;

        if (!name || !lastName || !email || !rut) {
            return NextResponse.json(
                {error: "All fields are required"},
                {status: 400}
            );
        }

        const updatedUser = {
            documentId,
            name,
            lastName,
            email,
            rut,
        };

        const dataResponse: CreateResponseInterface = await updateWithRest(token, documentId, email, name, lastName, rut);
        if (!dataResponse.user) {
            console.log()
        }
        return NextResponse.json(
            {message: "User updated successfully", data: updatedUser},
            {status: 200}
        );
    } catch (error) {
        console.error("Error updating user:", error);
        return NextResponse.json(
            {error: "Failed to update user"},
            {status: 500}
        );
    }
}
