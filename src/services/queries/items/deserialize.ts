import { DateTime } from "luxon";
import { Item } from "@/types";
export const deserialize = (
    id: string,
    item: { [key: string]: string },
): Item => {
    return {
        id,
        name: item.name,
        imageUrl: item.imageUrl,
        description: item.description,
        createdAt: DateTime.fromMillis(parseInt(item.createdAt)),
        endingAt: DateTime.fromMillis(parseInt(item.endingAt)),
        ownerId: item.ownerId,
        highestBidUserId: item.highestBidUserId,
        status: item.status,
        price: parseFloat(item.price),
        views: parseInt(item.views),
        likes: parseInt(item.likes),
        bids: parseInt(item.bids),
    } as Item;
};
