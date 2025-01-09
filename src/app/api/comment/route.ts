import db from "@/lib/db";
import { verifyjwtToken } from "@/lib/jwt";
import Comments from "@/models/Comment";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    await db.connect();

    const accessToken = await req.headers.get('authorization');
    const token = accessToken?.split(' ')[1]
    const decodeToken = verifyjwtToken(token as string)
    if (!accessToken || !decodeToken) {
        return new NextResponse(JSON.stringify({ error: "unauthorized (wrong or Expiry Token)" }), { status: 403 })
    }

    try {
        const body = await req.json();
        let newComment = await Comments.create(body);
        newComment = newComment.populate('authorId');
        return new NextResponse(JSON.stringify({ msg: 'sucessfully added comment' }), { status: 200 })
    } catch (error) {
        return new NextResponse(JSON.stringify(error), { status: 500 })
    }
}