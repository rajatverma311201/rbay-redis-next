import { getUserKey, getUsernamesKey, getUsernamesUniqueKey } from "@/lib/keys";
import { redisClient } from "@/lib/redis";
import { genId } from "@/lib/utils";
import { CreateUserAttrs } from "types";

export const getUserByUsername = async (username: string) => {
    const decimalId = await redisClient.zScore(getUsernamesKey(), username);

    if (!decimalId) {
        throw new Error("User does not exists");
    }

    const userId = decimalId.toString(16);

    return getUserById(userId);
};

export const getUserById = async (id: string) => {
    const userKey = getUserKey(id);
    const user = await redisClient.hGetAll(userKey);

    return deserializeUser(id, user);
};

export const createUser = async (attrs: CreateUserAttrs) => {
    const exists = await redisClient.sIsMember(
        getUsernamesUniqueKey(),
        attrs.username,
    );

    if (exists) {
        throw new Error("User already exists");
    }

    const id = genId();
    const userKey = getUserKey(id);

    await Promise.all([
        redisClient.sAdd(getUsernamesUniqueKey(), attrs.username),

        redisClient.hSet(userKey, serializeUser(attrs)),

        redisClient.zAdd(getUsernamesKey(), {
            value: attrs.username,
            score: parseInt(id, 16),
        }),
    ]);

    return id;
};

const serializeUser = (user: CreateUserAttrs) => {
    return {
        username: user.username,
        password: user.password,
    };
};

const deserializeUser = (userId: string, user: Record<string, string>) => {
    return {
        id: userId,
        username: user.username,
        password: user.password,
    };
};
