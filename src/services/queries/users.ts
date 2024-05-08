import { getUserKey } from "@/lib/keys";
import { redisClient } from "@/lib/redis";
import { generateUserId } from "@/lib/utils";
import { CreateUserAttrs } from "types";

export const getUserByUsername = async (username: string) => {};

export const getUserById = async (id: string) => {
    const userKey = getUserKey(id);
    const user = await redisClient.hGetAll(userKey);

    return deserializeUser(id, user);
};

export const createUser = async (attrs: CreateUserAttrs) => {
    const id = generateUserId();
    const userKey = getUserKey(id);

    await redisClient.hSet(userKey, serializeUser(attrs));

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
