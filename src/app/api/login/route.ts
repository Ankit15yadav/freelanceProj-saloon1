import { NextRequest, NextResponse } from 'next/server'
import jwt from 'jsonwebtoken'
import { db } from '@/server/db'

export async function POST(request: NextRequest) {
    try {
        const body = await request.json()
        const { email, password } = body

        if (!email || !password) {
            return NextResponse.json({ error: 'Missing email or password' }, { status: 400 })
        }

        const user = await db.user.findUnique({
            where: { email },
        })

        if (!user) {
            return NextResponse.json({ message: "No user found with this email" }, { status: 404 })
        }

        if (password !== user.password) {
            return NextResponse.json({ message: "Invalid password" }, { status: 401 })
        }

        const token = jwt.sign(
            { id: user.id, email: user.email },
            process.env.JWT_SECRET as string,
            { expiresIn: '1h' }
        )

        // console.log(token);

        const response = NextResponse.json({ message: 'Login successful' })
        response.cookies.set('token', token, {
            httpOnly: true,
            maxAge: 60 * 60, // 1 hour
            path: '/',
        })

        return response
    } catch (error) {
        console.error('Login error:', error)
        return NextResponse.json({ error: 'Something went wrong' }, { status: 500 })
    }
}
