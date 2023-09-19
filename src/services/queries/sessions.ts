import type { Session } from "@/types";
import { client } from "@/services/redis/client";
import { sessionsKey } from "@/services/keys";

export const getSession = async (id: string) => {
    const session = await client.hGetAll(sessionsKey(id));

    if (Object.keys(session).length === 0) return null;

    return deserializeSession(id, session);
};

export const saveSession = async (session: Session) => {
    await client.hSet(sessionsKey(session.id), serializeSession(session));
    return session.id;
};

const deserializeSession = (id: string, session: { [key: string]: string }) => {
    const { userId } = session;

    return {
        id,
        userId,
    };
};

const serializeSession = (session: Session) => {
    const { userId, username } = session;
    return {
        userId: userId as string,
        username,
    };
};
