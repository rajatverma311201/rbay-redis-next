import { Keys } from "@/lib/keys";
import { redisClient } from "@/lib/redis";
import { genId } from "@/lib/utils";
import { CreateItemAttrs } from "types";
import { serializeItem } from "./serialize";
import { deserializeItem } from "./deserialize";

export const getItem = async (itemId: string) => {
    const itemKey = Keys.getItemsKey(itemId);
    const resp = await redisClient.hGetAll(itemKey);

    if (Object.keys(resp).length === 0) {
        return null;
    }

    return deserializeItem(itemId, resp);
};

export const getItems = async (ids: string[]) => {
    const commands = ids.map((id) => {
        return redisClient.hGetAll(Keys.getItemsKey(id));
    });

    const responses = await Promise.all(commands);

    const items = responses.map((resp, idx) => {
        if (Object.keys(resp).length === 0) {
            return null;
        }

        return deserializeItem(ids[idx], resp);
    });

    return items;
};

export const createItem = async (attrs: CreateItemAttrs) => {
    const id = genId();
    const itemKey = Keys.getItemsKey(id);
    const serialized = serializeItem(attrs);

    await redisClient.hSet(itemKey, serialized);
    return id;
};
