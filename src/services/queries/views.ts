import { itemsByViewsKey, itemsKey } from "../keys";
import { client } from "../redis/client";

export const incrementView = async (itemId: string, userId: string) => {
    const isNew = await client.pfAdd(itemsKey(itemId), userId);

    if (!isNew) return;

    return await Promise.all([
        client.hIncrBy(itemsKey(itemId), "views", 1),
        client.zIncrBy(itemsByViewsKey(), 1, itemId),
    ]);
};
