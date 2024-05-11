import { Keys } from "@/lib/keys";
import { redisClient } from "@/lib/redis";
import { getItems } from "./items/items";

export const userLikesItem = async (itemId: string, userId: string) => {
    const key = Keys.getUserLikesKey(userId);
    const res = await redisClient.sIsMember(key, itemId);

    return res;
};

export const likeItem = async (itemId: string, userId: string) => {
    const key = Keys.getUserLikesKey(userId);
    const inserted = await redisClient.sAdd(key, itemId);

    if (inserted) {
        await redisClient.hIncrBy(Keys.getItemsKey(itemId), "likes", 1);
    }

    return inserted;
};

export const unlikeItem = async (itemId: string, userId: string) => {
    const key = Keys.getUserLikesKey(userId);
    const removed = await redisClient.sRem(key, itemId);

    if (removed) {
        await redisClient.hIncrBy(Keys.getItemsKey(itemId), "likes", -1);
    }
};

export const likedItemsByUserId = async (userId: string) => {
    const key = Keys.getUserLikesKey(userId);
    const itemIds = await redisClient.sMembers(key);

    const items = await getItems(itemIds);

    return items;
};
