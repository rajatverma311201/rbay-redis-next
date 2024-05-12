import { Keys } from "@/lib/keys";
import { redisClient } from "@/lib/redis";

export const incrementViews = async (itemId: string, userId: string) => {
    const accepted = await redisClient.pfAdd(
        Keys.getItemViewsKey(itemId),
        userId,
    );

    if (!accepted) {
        return;
    }

    return await Promise.all([
        redisClient.hIncrBy(Keys.getItemKey(itemId), "views", 1),
        redisClient.zIncrBy(Keys.getItemsByViewsKey(), 1, itemId),
    ]);
};
