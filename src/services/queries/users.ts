import type { CreateUserAttrs } from "@/types";
import { genId } from "@/services/utils";
import { client } from "@/services/redis/client";
import { usernamesUniqueKey, usersKey } from "../keys";

export const getUserByUsername = async (username: string) => {};

export const getUserById = async (id: string) => {
    const user = await client.hGetAll(usersKey(id));

    return deserializeUser(id, user);
};

export const createUser = async (attrs: CreateUserAttrs) => {
    const userId = genId();

    const { username } = attrs;

    const exists = await client.sIsMember(usernamesUniqueKey(), username);

    if (exists) {
        throw new Error("Username already taken");
    }

    await client.hSet(usersKey(userId), serializeUser(attrs));

    await client.sAdd(usernamesUniqueKey(), username);

    return userId;
};

const serializeUser = (user: CreateUserAttrs) => {
    return {
        username: user.username,
        password: user.password,
    };
};

const deserializeUser = (id: string, user: { [key: string]: string }) => {
    const { username, password } = user;

    return {
        id,
        username,
        password,
    };
};
