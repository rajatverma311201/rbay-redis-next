import { signup } from "@/services/auth";
import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";

export const POST = async (req: Request) => {
    const { username, password } = await req.json();

    console.log("cookies", cookies().get("tokn"));
    cookies().set("token", "1234");

    // const userId = await signup(username, password);

    return NextResponse.json({
        message: "User Signin",
    }); // res.json({});
};
