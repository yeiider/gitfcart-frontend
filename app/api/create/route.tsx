import { NextResponse } from 'next/server'
import { createWithRest } from '@/lib/useAuth'

export async function POST(request: Request) {
    try {
        const requestData = await request.json()

        const { username, password, email, name, lastName, rut } = requestData

        const userData = await createWithRest(username, password, email, name, lastName, rut)

        const { jwt, user } = userData
        console.log(userData)

        if (!jwt || !user) {
            throw new Error('Error en la creación del usuario o falta de datos en la respuesta')
        }
        const response = NextResponse.json({ success: true, message: 'User created successfully', user })
        response.cookies.set('jwt', jwt, {
            path: '/',
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
        })


        return response
    } catch (error) {
        if (error instanceof Error) {
            console.error('Error al crear el usuario:', error)
            return NextResponse.json({ success: false, error: error.message }, { status: 500 })
        }else {
            return NextResponse.json({ success: false, error: "Error de en el servidor"}, { status: 500 })
        }
    }
}
