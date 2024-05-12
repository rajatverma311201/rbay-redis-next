import { Keys } from "@/lib/keys";
import { redisClient } from "@/lib/redis";
import type { CreateBidAttrs, Bid } from "types";

export const createBid = async (attrs: CreateBidAttrs) => {
    const serialized = serializeBid(attrs.amount, attrs.createdAt);
    return await redisClient.rPush(
        Keys.getBidHistoryKey(attrs.itemId),
        serialized,
    );
};

export const getBidHistory = async (
    itemId: string,
    offset = 0,
    count = 10,
): Promise<Bid[]> => {
    const startIdx = -1 * offset - count;
    const endIdx = -1 - offset;

    const range = await redisClient.lRange(
        Keys.getBidHistoryKey(itemId),
        startIdx,
        endIdx,
    );

    const arr = range.map((serializedBid) => deserializeBid(serializedBid));

    return arr;
};

const serializeBid = (amount: number, createdAt: number) => {
    return `${amount}:${createdAt}`;
};

const deserializeBid = (serializedBid: string): Bid => {
    const [amount, createdAt] = serializedBid.split(":");
    return {
        amount: parseFloat(amount),
        createdAt: parseInt(createdAt),
    };
};
