import { Item } from "@/types";
import { itemsKey, userLikesItemKey } from "../keys";
import { client } from "../redis/client";
import { getItems } from "./items";

export const userLikesItem = async (
    itemId: string,
    userId: string,
): Promise<boolean> => {
    const likesItem = await client.sIsMember(userLikesItemKey(userId), itemId);
    return likesItem;
};

export const likedItems = async (userId: string): Promise<(Item | null)[]> => {
    const itemIds = await client.sMembers(userLikesItemKey(userId));
    return getItems(itemIds);
};

export const likeItem = async (itemId: string, userId: string) => {
    const inserted = await client.sAdd(userLikesItemKey(userId), itemId);
    if (inserted) {
        await client.hIncrBy(itemsKey(itemId), "likes", 1);
    }
};

export const unlikeItem = async (itemId: string, userId: string) => {
    const removed = await client.sRem(userLikesItemKey(userId), itemId);
    if (removed) {
        await client.hIncrBy(itemsKey(itemId), "likes", -1);
    }
};

export const commonLikedItems = async (
    userOneId: string,
    userTwoId: string,
): Promise<(Item | null)[]> => {
    const commonLikedItemIds = await client.sInter([
        userLikesItemKey(userOneId),
        userLikesItemKey(userTwoId),
    ]);
    return getItems(commonLikedItemIds);
};
