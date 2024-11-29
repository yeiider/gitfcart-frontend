import {NextResponse} from "next/server";
import {cookies} from "next/headers";
import {changePassword} from "@/lib/useAuth";
import {LoginResponseInterface} from "@/app/interfaces/loginResponseInterface";

export async function POST(request: Request) {
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

        const {currentPassword, password} = body;

        if (!currentPassword || !password) {
            return NextResponse.json(
                {error: "All fields are required"},
                {status: 400}
            );
        }

        const payload = {
            password,
            currentPassword,
        };

        const dataResponse: LoginResponseInterface = await changePassword(token, currentPassword, password);
        if (!dataResponse.data) {
            console.log()
        }
        console.log(dataResponse)
        return NextResponse.json(
            {message: "User updated successfully", data: payload},
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
