import { signup } from "@/services/auth";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (req: Request) => {
    const { username, password } = await req.json();

    const userId = await signup(username, password);

    return NextResponse.json({
        message: "User saved",
        userId,
    }); // res.json({});
};
