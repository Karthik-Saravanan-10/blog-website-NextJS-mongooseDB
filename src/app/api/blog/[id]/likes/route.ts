import db from "@/lib/db";
import { verifyjwtToken } from "@/lib/jwt";
import Blog from "@/models/Blog";
import { JwtPayload } from "jsonwebtoken";
import { NextRequest, NextResponse } from "next/server";

export async function PUT(req: NextRequest, { params: { id } }: { params: { id: string | number } }) {
    const accessToken = await req.headers.get('authorization');
    const token = accessToken?.split(' ')[1]
    const decodeToken = verifyjwtToken(token as string) as JwtPayload;
    if (!accessToken || !decodeToken) {
        return new NextResponse(JSON.stringify({ error: 'unauthorized (Wrong or Expiry) Token' }), { status: 403 })
    }

    try {
        const blog = await Blog.findById(id).populate('authorId')

        if (blog.likes.includes(decodeToken._id)) {
            blog.likes = blog.likes.filter((id: any) => id.toString() !== decodeToken._id)
        } else {
            blog.likes.push(decodeToken._id)
        }

        await blog.save()
        return new NextResponse(JSON.stringify({ msg: "sucessfully added like in Blog" }), { status: 200 })
    } catch (error) {
        return new NextResponse(JSON.stringify({ Error: Error.name }), { status: 500 })
    }
}