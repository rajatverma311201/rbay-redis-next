import type { CreateBidAttrs, Bid } from "@/types";
import { DateTime } from "luxon";
import { client } from "@/services/redis/client";
import { itemsBidHistoryKey, itemsKey } from "@/services/keys";
import { getItem } from "./items";

export const createBid = async (attrs: CreateBidAttrs) => {
    const item = await getItem(attrs.itemId);

    if (!item) {
        throw new Error(`Item  does not exist`);
    }

    if (item.price >= attrs.amount) {
        throw new Error(`Bid must be greater than current price`);
    }

    if (item.endingAt.diff(DateTime.now()).toMillis() < 0) {
        throw new Error(`Bidding has ended for the item`);
    }

    const serializedBid = serializeBidHist(
        attrs.amount,
        attrs.createdAt.toMillis(),
    );

    return await Promise.all([
        client.rPush(itemsBidHistoryKey(attrs.itemId), serializedBid),
        client.hSet(itemsKey(attrs.itemId), {
            bids: item.bids + 1,
            price: attrs.amount,
            highestBidUserId: attrs.userId,
        }),
    ]);
};

export const getBidHistory = async (
    itemId: string,
    offset = 0,
    count = 10,
): Promise<Bid[]> => {
    const startIdx = -1 * offset - count;
    const endIdx = -1 - offset;

    const serializedBids = await client.lRange(
        itemsBidHistoryKey(itemId),
        startIdx,
        endIdx,
    );

    if (serializedBids.length) {
        return serializedBids.map(deserializeBidHist);
    }

    return [];
};

const serializeBidHist = (amount: number, createdAt: number) => {
    return `${amount}:${createdAt}`;
};

const deserializeBidHist = (serializedBid: string): Bid => {
    const [amount, createdAt] = serializedBid.split(":");
    return {
        amount: parseFloat(amount),
        createdAt: DateTime.fromMillis(parseInt(createdAt)),
    };
};
