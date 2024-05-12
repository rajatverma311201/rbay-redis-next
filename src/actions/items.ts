"use server";
import { createImageUrl } from "@/lib/utils";
import { createItem } from "@/services/queries/items/items";
import { getAuthSession } from "./auth";
import { likeItem, unlikeItem } from "@/services/queries/likes";
import { createBid } from "@/services/queries/bids";

interface CreateItemActionArgs {
    name: string;
    description: string;
    duration: string;
}
export const createItemAction = async (attrs: CreateItemActionArgs) => {
    const authSession = await getAuthSession();

    if (!authSession) {
        throw new Error("Unauthorized");
    }

    const currDate = Date.now();

    const itemId = await createItem({
        name: attrs.name,
        description: attrs.description,
        createdAt: currDate,
        endingAt: currDate + parseInt(attrs.duration) * 1000,
        imageUrl: createImageUrl(),
        ownerId: authSession?.userId,
        highestBidUserId: "",
        price: 0,
        views: 0,
        likes: 0,
        bids: 0,
        status: "",
    });

    return itemId;
};

export const likeAnItem = async (itemId: string) => {
    const authSession = await getAuthSession();

    if (!authSession) {
        throw new Error("Unauthorized");
    }

    likeItem(itemId, authSession.userId);
};

export const unlikeAnItem = async (itemId: string) => {
    const authSession = await getAuthSession();

    if (!authSession) {
        throw new Error("Unauthorized");
    }

    unlikeItem(itemId, authSession.userId);
};

export const createBidAction = async (
    itemId: string,
    amount: number,
    itemEndingAt: number,
) => {
    const authSession = await getAuthSession();

    if (!authSession) {
        throw new Error("Unauthorized");
    }

    await createBid({
        amount,
        createdAt: Date.now(),
        itemId,
        userId: authSession.userId,
        itemEndingAt,
    });
    return true;
};
