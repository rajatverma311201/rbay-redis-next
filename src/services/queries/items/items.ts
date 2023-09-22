import { genId } from "@/services/utils";
import type { CreateItemAttrs } from "@/types";
import { serialize } from "./serialize";
import { deserialize } from "./deserialize";
import { client } from "@/services/redis/client";
import { itemsByEndingAtKey, itemsByViewsKey, itemsKey } from "@/services/keys";

export const getItem = async (id: string) => {
    const item = await client.hGetAll(itemsKey(id));

    if (Object.keys(item).length === 0) {
        return null;
    }

    return deserialize(id, item);
};

export const getItems = async (ids: string[]) => {
    const commandsList = ids.map((id) => client.hGetAll(itemsKey(id)));

    const items = await Promise.all(commandsList);

    const results = items.map((item, idx) => {
        if (Object.keys(item).length === 0) {
            return null;
        }
        return deserialize(ids[idx], item);
    });

    return results;
};

export const createItem = async (attrs: CreateItemAttrs, userId: string) => {
    const id = genId();

    const serialized = serialize(attrs);

    const resolved = await Promise.all([
        client.hSet(itemsKey(id), serialized),

        client.zAdd(itemsByViewsKey(), {
            value: id,
            score: 0,
        }),

        client.zAdd(itemsByEndingAtKey(), {
            value: id,
            score: attrs.endingAt.toMillis(),
        }),
    ]);

    return id;
};
