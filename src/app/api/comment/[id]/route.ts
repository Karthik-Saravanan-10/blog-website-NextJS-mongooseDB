import db from "@/lib/db";
import { verifyjwtToken } from "@/lib/jwt";
import Comments from "@/models/Comment";
import { JwtPayload } from "jsonwebtoken";
import { NextRequest, NextResponse } from "next/server";

export async function GET({ params: { id } }: { params: { id: string | number } }) {
    await db.connect()

    try {
        const comment = await Comments.findById(id).populate('authorId')
        return new NextResponse(JSON.stringify(comment), { status: 200 })
    } catch (error) {
        return new NextResponse(JSON.stringify(error), { status: 500 })
    }
}

export async function DELETE(req: NextRequest, { params: { id } }: { params: { id: string | number } }) {
    await db.connect()

    const accessToken = await req.headers.get('authorization');
    const token = accessToken?.split(' ')[1];
    const decodeToken = verifyjwtToken(token as string) as JwtPayload;

    if (!accessToken || !decodeToken) {
        return new NextResponse(JSON.stringify({ msg: 'unauthorized (Wrong or Expired) Token' }), { status: 200 })
    }

    try {
        const comment = await Comments.findById(id).populate('authorId');
        if (comment?.authorId?._id.toString() !== decodeToken?._id.toString()) {
            return new NextResponse(JSON.stringify({ msg: 'author only deleted Comment' }), { status: 200 })
        }
        await Comments.findByIdAndDelete(id)
        return new NextResponse(JSON.stringify(comment), { status: 200 })
    } catch (error) {
        return new NextResponse(JSON.stringify(error), { status: 500 })
    }
}