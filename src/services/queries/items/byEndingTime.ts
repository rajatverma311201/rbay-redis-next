import { itemsByEndingAtKey } from "@/services/keys";
import { client } from "@/services/redis/client";

export const itemsByEndingTime = async (
    order: "DESC" | "ASC" = "DESC",
    offset = 0,
    count = 10,
) => {
    const itemIds = await client.zRangeByScore(
        itemsByEndingAtKey(),
        Date.now(),
        "+inf",
        {
            LIMIT: { offset, count },
        },
    );
};
