import React from "react";
import { DateTime } from "luxon";
import Image from "next/image";
import { Item } from "@/types";

interface ItemSummary {
    id: string;
    name: string;
    endingAt: number;
    imageUrl: string;
    price: number;
    views?: number;
}

interface Props {
    item: ItemSummary | Item;
    showViews: boolean;
}

const Card: React.FC<Props> = ({ item, showViews }) => {
    // const endingAt =
    // typeof item.endingAt === "number"
    //     ? DateTime.fromMillis(item.endingAt).toRelative()
    //     : item.endingAt.toRelative();

    const endingAt = DateTime.fromMillis(
        (item as ItemSummary).endingAt,
    ).toRelative();

    return (
        <div className="flex w-80 items-center justify-center">
            <div className="w-full p-2">
                <div className="card flex flex-col justify-center rounded-lg border border-gray-400 bg-white p-8 shadow">
                    <div className="prod-title">
                        <a href={`/items/${item.id}`}>
                            <p className="h-16 overflow-hidden text-ellipsis text-xl font-bold uppercase text-gray-900">
                                {item.name}
                            </p>
                        </a>
                        <p className="text-sm uppercase text-gray-400">
                            Ends {endingAt}
                        </p>
                        {showViews && (
                            <p className="text-sm uppercase text-gray-400">
                                {item.views} views
                            </p>
                        )}
                    </div>
                    <div className="prod-img">
                        <a href={`/items/${item.id}`}>
                            <Image
                                width={500}
                                height={200}
                                src={item.imageUrl}
                                alt=""
                                className="my-4 h-44 w-full rounded object-cover object-center"
                            />
                        </a>
                    </div>
                    <div className="prod-info grid gap-10">
                        <div className="flex flex-col items-center justify-between text-gray-900 md:flex-row">
                            <p className="text-xl font-bold">
                                ${item.price.toFixed(2) || 0}
                            </p>
                            <a href={`/items/${item.id}`}>
                                <button className="rounded-full border-2 border-gray-900 px-6 py-2 uppercase transition duration-200 ease-in hover:bg-gray-800 hover:text-white focus:outline-none">
                                    View
                                </button>
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Card;
