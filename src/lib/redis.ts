import { createClient } from "redis";

export const redisClient = createClient();

redisClient.on("error", (err) => console.log("Redis Client Error", err));

redisClient.connect();

export const redisSet = async (key: string, value: string) => {
    await redisClient.set(key, value);
};
