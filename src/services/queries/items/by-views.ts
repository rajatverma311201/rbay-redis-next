import { Keys } from "@/lib/keys";
import { redisClient } from "@/lib/redis";
import { deserializeItem } from "./deserialize";

interface ItemsByViewsArgs {
    order?: "DESC" | "ASC";
    offset?: number;
    count?: number;
}
export const itemsByViews = async ({
    order = "DESC",
    offset = 0,
    count = 10,
}: ItemsByViewsArgs) => {
    const starItemKey = Keys.getItemKey("*");

    let results = await redisClient.sort(Keys.getItemsByViewsKey(), {
        GET: [
            "#",
            `${starItemKey}->name`,
            `${starItemKey}->views`,
            `${starItemKey}->endingAt`,
            `${starItemKey}->imageUrl`,
            `${starItemKey}->price`,
        ],

        BY: "nosort",
        DIRECTION: order,
        LIMIT: {
            offset,
            count,
        },
    });

    const items = [];

    while (results.length) {
        const [id, name, views, endingAt, imageUrl, price, ...rest] = results;

        const item = deserializeItem(id, {
            name,
            views,
            endingAt,
            imageUrl,
            price,
        });

        items.push(item);

        results = rest;
    }

    console.log(items);

    return items;
};
