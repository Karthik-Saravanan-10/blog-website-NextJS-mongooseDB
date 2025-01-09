import db from "@/lib/db";
import User from "@/models/User";
import bcrypt from 'bcryptjs'

import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    try {
        const { username, email, password: pass } = await req.json()
        //console.log(await req.json())
        await db.connect()
        const isPresent = await User.findOne({ email });
        if (isPresent) {
            throw new Error("User Already Exists")
        }
        const hashPass = await bcrypt.hash(pass, 1);
        const newUser = await User.create({ username: username, email: email, password: hashPass })
        const { password, ...user } = newUser._doc
        return new NextResponse(JSON.stringify(user), { status: 200 })
    } catch (error: any) {
        return new NextResponse(JSON.stringify(error.message), { status: 500 })
    }
}