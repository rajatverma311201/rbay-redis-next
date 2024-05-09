import { getSessionKey } from "@/lib/keys";
import { redisClient } from "@/lib/redis";
import { Session } from "types";

export const getSession = async (sessionId: string) => {
    const sessionKey = getSessionKey(sessionId);

    const session = await redisClient.hGetAll(sessionKey);

    if (Object.keys(session).length === 0) {
        return null;
    }

    return deserializeSession(sessionId, session);
};

export const saveSession = async (attrs: Session) => {
    const sessionKey = getSessionKey(attrs.id);

    return await redisClient.hSet(sessionKey, serializeSession(attrs));
};

export const removeSession = async (sessionId: string) => {
    const sessionKey = getSessionKey(sessionId);

    return await redisClient.del(sessionKey);
};

const deserializeSession = (
    sessionId: string,
    session: Record<string, string>,
) => {
    return {
        id: sessionId,
        userId: session.userId,
        username: session.username,
    };
};

const serializeSession = (session: Session) => {
    return {
        userId: session.userId,
        username: session.username,
    };
};
