"use server";

import { decrypt, encrypt } from "@/lib/sessions";
import { signup as SIGNUP, signin as SIGNIN } from "@/services/auth";
import {
    getSession,
    removeSession,
    saveSession,
} from "@/services/queries/sessions";
import { randomBytes } from "crypto";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { Session } from "types";

const createSession = async ({
    userId,
    username,
}: {
    userId: string;
    username: string;
}): Promise<Session> => {
    const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);

    // 2. Encrypt the session ID

    const sessionId = randomBytes(4).toString("hex");

    const session = await encrypt({ sessionId });

    const sessionToSave = {
        id: sessionId,
        userId: userId,
        username: username,
    };

    await saveSession(sessionToSave);

    // 3. Store the session in cookies for optimistic auth checks
    cookies().set("session", session, {
        httpOnly: true,
        secure: true,
        expires: expiresAt,
        sameSite: "lax",
        path: "/",
    });

    return sessionToSave;
};

async function deleteSession() {
    const authSession = await getAuthSession();
    if (!authSession) {
        return;
    }
    cookies().delete("session");

    const { id: sessionId } = authSession;
    await removeSession(sessionId);
}

export const signup = async (
    username: string,
    password: string,
    opts?: any,
) => {
    const userId = await SIGNUP(username, password);
    await createSession({ userId, username });
    return true;
};

export const signin = async (
    username: string,
    password: string,
    opts?: any,
) => {
    const userId = await SIGNIN(username, password);
    await createSession({ userId, username });
    return true;
};

export const signout = async (opts?: any) => {
    console.log("signout");
    await deleteSession();
};

export const getAuthSession = async () => {
    const sessionCookie = cookies().get("session")?.value;

    if (!sessionCookie) {
        return null;
    }

    const decryptedSession = await decrypt(sessionCookie);

    const { sessionId } = decryptedSession || {};

    if (!sessionId) {
        return null;
    }

    const session = await getSession(sessionId as string);

    return session;
};
