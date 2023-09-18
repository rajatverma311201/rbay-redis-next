import React from "react";
import { DateTime } from "luxon";
import Badge from "./Badge";

interface ItemSummary {
    id: string;
    name: string;
    endingAt: number;
    imageUrl: string;
    price: number;
    bids: number;
    views: number;
    likes: number;
}

interface Status {
    value: string;
    role: string;
}

function status(item: ItemSummary): Status {
    let t =
        typeof item.endingAt === "object"
            ? (item.endingAt as any).toMillis()
            : item.endingAt;
    const ended = DateTime.fromMillis(t) < DateTime.now();
    const sold = item.price > 0;

    if (ended && sold) {
        return { value: "sold", role: "success" };
    } else if (ended) {
        return { value: "unsold", role: "danger" };
    } else {
        return { value: "active", role: "secondary" };
    }
}

interface ItemBadgeProps {
    item: ItemSummary;
}

function ItemBadge({ item }: ItemBadgeProps) {
    const itemStatus = status(item);

    return <Badge role={itemStatus.role}>{itemStatus.value}</Badge>;
}

export default ItemBadge;
