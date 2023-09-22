import type { CreateUserAttrs, User } from "@/types";
import { genId } from "@/services/utils";
import { client } from "@/services/redis/client";
import { usernamesKey, usernamesUniqueKey, usersKey } from "../keys";
import { decToHex, hexToDec } from "@/services/utils/maths";

export const getUserByUsername = async (username: string): Promise<User> => {
    const decimalId = await client.zScore(usernamesKey(), username);

    if (!decimalId) {
        throw new Error("User does not exist");
    }

    const userId = decToHex(decimalId);

    const user = await client.hGetAll(usersKey(userId));

    return deserializeUser(userId, user);
};

export const getUserById = async (id: string) => {
    const user = await client.hGetAll(usersKey(id));

    return deserializeUser(id, user);
};

export const createUser = async (attrs: CreateUserAttrs) => {
    const userId = genId();

    const { username } = attrs;

    // We can use just sorted set only instead of set  to store usernames.
    // but i am not doing that as i am learning to use redis. and its
    // good to learn different data structures and their use cases.

    const exists = await client.sIsMember(usernamesUniqueKey(), username);

    if (exists) {
        throw new Error("Username already taken");
    }

    const hashStore = client.hSet(usersKey(userId), serializeUser(attrs));

    const setStore = client.sAdd(usernamesUniqueKey(), username);

    const sortedSetStore = client.zAdd(usernamesKey(), {
        value: username,
        score: hexToDec(userId),
    });

    await Promise.all([hashStore, setStore, sortedSetStore]);

    return userId;
};

const serializeUser = (user: CreateUserAttrs) => {
    return {
        username: user.username,
        password: user.password,
    };
};

const deserializeUser = (id: string, user: { [key: string]: string }): User => {
    const { username, password } = user;

    return {
        id,
        username,
        password,
    };
};
