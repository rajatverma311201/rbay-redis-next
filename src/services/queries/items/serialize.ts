import { DateTime } from "@/lib/utils";
import { CreateItemAttrs } from "types";

export const serializeItem = (attrs: CreateItemAttrs) => {
    return {
        ...attrs,
        // createdAt: DateTime.toMilliseconds(attrs.createdAt),
        // endingAt: DateTime.toMilliseconds(attrs.endingAt),
    };
};
