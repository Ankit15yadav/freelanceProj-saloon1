import { NextResponse, type NextRequest } from "next/server";

export async function POST(request: NextRequest) {
    const response = NextResponse.json({
        message: "Logged Out Successfully"
    });

    response.cookies.set("token", "", {
        httpOnly: true,
        expires: new Date(0),
        path: "/"
    })

    return response;
}