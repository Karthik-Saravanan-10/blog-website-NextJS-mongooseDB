import db from "@/lib/db";
import { verifyjwtToken } from "@/lib/jwt";
import Blog from "@/models/Blog";
import { NextRequest, NextResponse } from "next/server";

export async function GET() {
    await db.connect();

    try {
        const blogs = Blog.find({}).limit(10).populate('authorId');
        return new NextResponse(JSON.stringify(blogs), { status: 200 })
    } catch (error) {
        return new NextResponse(null, { status: 500 })
    }
}

export async function POST(req: NextRequest) {
    await db.connect();

    const accessToken = await req.headers.get('authorization');
    const token = accessToken?.split(' ')[1]
    const decodeToken = verifyjwtToken(token as string)

    if (!accessToken || !decodeToken) {
        return new NextResponse(JSON.stringify({ error: "unauthorized (wrong or Expiry Token)" }), { status: 403 })
    }

    try {
        const data = await req.json()
        const newBlog = Blog.create(data);
        return new NextResponse(JSON.stringify(newBlog), { status: 200 })
    } catch (error) {
        return new NextResponse(JSON.stringify(error), { status: 500 })
    }
}