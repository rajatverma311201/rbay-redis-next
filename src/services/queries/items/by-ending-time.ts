import { Keys } from "@/lib/keys";
import { redisClient } from "@/lib/redis";
import { getItems } from "./items";

interface ItemsByEndingTimeArgs {
    order?: "DESC" | "ASC";
    offset?: number;
    count?: number;
}
export const itemsByEndingTime = async ({
    order = "DESC",
    offset = 0,
    count = 10,
}: ItemsByEndingTimeArgs) => {
    const itemIds = await redisClient.zRange(
        Keys.getItemsByEndingAtKey(),
        Date.now(),
        "+inf",
        {
            BY: "SCORE",
            LIMIT: {
                count,
                offset,
            },
        },
    );

    console.log(itemIds);
    const items = await getItems(itemIds);

    return items;
};
