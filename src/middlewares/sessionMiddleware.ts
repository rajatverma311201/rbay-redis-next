import { randomBytes } from "crypto";
// import keygrip from "keygrip";
// import { serialize, parse } from "cookie";
import { getSession, saveSession } from "@/services/queries/sessions";
import { type Session } from "@/types";
import { NextRequest, NextResponse } from "next/server";

import { cookies } from "next/headers";

// const keys = new keygrip([process.env.COOKIE_KEY || "alskdjf"]);

export async function sessionMiddleware(req: NextRequest) {
    const sessionCookie = cookies().get("session-token");

    if (!sessionCookie) {
        return;
    }

    const [sessionId, sessionToken] = sessionCookie.value.split(":");

    const session = await getSession(sessionId);

    const response = NextResponse.next();

    if (session) {
        response.headers.set("auth-user", JSON.stringify(session));
    }

    return response;

    /*
    const { auth } = parse(event.request.headers.get("cookie") || "");

    let sessionId = "";
    let sig = "";
    if (auth) {
        [sessionId, sig] = auth.split(":");
    }

    let session: Session;
    if (!sessionId || !keys.verify(sessionId, sig)) {
        session = await createSession();
    } else {
        session = (await getSession(sessionId)) || {
            id: "",
            userId: "",
            username: "",
        };
    }

    event.locals.session = session;
    const res = await resolve(event);

    if (event.locals.session) {
        await saveSession(event.locals.session);
        res.headers.set("set-cookie", sessionToCookie(session.id));
    } else {
        res.headers.set("set-cookie", unsetSession());
    }

    return res;
    */
}

const createSession = async (): Promise<Session> => {
    const id = randomBytes(4).toString("hex");

    const session = {
        id,
        userId: "",
        username: "",
    };

    await saveSession(session);

    return session;
};

// const unsetSession = () => {
//     return serialize("auth", "", {
//         httpOnly: false,
//         path: "/",
//         maxAge: 60 * 60 * 24 * 7 * 52,
//     });
// };

// const sessionToCookie = (sessionId: string) => {
//     return serialize("auth", `${sessionId}:${keys.sign(sessionId)}`, {
//         httpOnly: false,
//         path: "/",
//         maxAge: 60 * 60 * 24 * 7 * 52,
//     });
// };
