import { createClient } from "redis";

const { REDIS_URL } = process.env;
export const redisClient = createClient({
    url: REDIS_URL || "redis://localhost:6379",
});

redisClient.on("error", (err) => console.log("Redis Client Error", err));

redisClient.connect();

export const redisSet = async (key: string, value: string) => {
    await redisClient.set(key, value);
};
