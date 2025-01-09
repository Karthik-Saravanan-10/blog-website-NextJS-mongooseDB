import db from "@/lib/db";
import { verifyjwtToken } from "@/lib/jwt";
import Blog from "@/models/Blog";
import { JwtPayload } from "jsonwebtoken";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest, { params: { id } }: { params: { id: string | number } }) {
    await db.connect()
    try {
        const blogData = await Blog.findById(id).populate('authorId').select('-password');

        return new NextResponse(JSON.stringify(blogData), { status: 200 })
    } catch (error) {
        return new NextResponse(JSON.stringify({ Error: Error.name }), { status: 500 })
    }
}

export async function PUT(req: NextRequest, { params: { id } }: { params: { id: string | number } }) {
    const accessToken = await req.headers.get('authorization');
    const token = accessToken?.split(' ')[1]
    const decodeToken = verifyjwtToken(token as string) as JwtPayload;
    if (!accessToken || !decodeToken) {
        return new NextResponse(JSON.stringify({ error: 'unauthorized (Wrong or Expiry) Token' }), { status: 403 })
    }
    try {
        const body = await req.json()
        const blog = await Blog.findById(id).populate('authorId')
        if ((blog?.authorId?._id.toString()) !== decodeToken?._id?.toString()) {
            return new NextResponse(JSON.stringify({ err: 'only author can be Modified' }), { status: 403 })
        }

        const updateBlog = await Blog.findByIdAndUpdate(id, { $set: { ...body } }, { new: true })

        return new NextResponse(JSON.stringify(updateBlog), { status: 200 })
    } catch (error) {
        return new NextResponse(JSON.stringify({ Error: Error.name }), { status: 500 })
    }

}

export async function DELETE(req: NextRequest, { params: { id } }: { params: { id: string | number } }) {
    const accessToken = await req.headers.get('authorization');
    const token = accessToken?.split(' ')[1]
    const decodeToken = verifyjwtToken(token as string) as JwtPayload;
    if (!accessToken || !decodeToken) {
        return new NextResponse(JSON.stringify({ error: 'unauthorized (Wrong or Expiry) Token' }), { status: 403 })
    }

    try {
        const blog = await Blog.findById(id).populate('authorId')
        if ((blog?.authorId?._id?.toString()) !== (decodeToken?._id?.toString())) {
            return new NextResponse(JSON.stringify({ err: 'only author can be Modified' }), { status: 403 })
        }

        await Blog.findByIdAndDelete(id)
        return new NextResponse(JSON.stringify({ err: 'blog sucessfully deleted' }), { status: 200 })
    } catch (error) {
        return new NextResponse(JSON.stringify(error), { status: 500 })
    }
}