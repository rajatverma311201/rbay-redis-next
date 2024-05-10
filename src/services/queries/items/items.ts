import { Keys } from "@/lib/keys";
import { redisClient } from "@/lib/redis";
import { genId } from "@/lib/utils";
import { CreateItemAttrs } from "types";
import { serializeItem } from "./serialize";

export const getItem = async (itemId: string) => {
    const item = await redisClient.get(Keys.getItemsKey(itemId));
    if (!item) {
        return null;
    }
    return JSON.parse(item);
};

export const getItems = async (ids: string[]) => {};

export const createItem = async (attrs: CreateItemAttrs) => {
    const id = genId();
    const itemKey = Keys.getItemsKey(id);
    const serialized = serializeItem(attrs);

    await redisClient.hSet(itemKey, serialized);
};
