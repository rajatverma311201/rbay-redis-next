import { getAuthSession } from "@/actions/auth";
import { ItemStat } from "@/components/item-stat";
import { LikeBtn } from "@/components/like-btn";
import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { getRemainingDurationFormatted } from "@/lib/utils";
import { getItem } from "@/services/queries/items/items";
import { userLikesItem } from "@/services/queries/likes";
import Image from "next/image";
import Link from "next/link";

interface ItemDetailPageProps {
    params: { itemId: string };
}

const ItemDetailPage: React.FC<ItemDetailPageProps> = async ({ params }) => {
    const authSession = await getAuthSession();
    const item = await getItem(params.itemId);

    const userLikes = authSession?.userId
        ? await userLikesItem(params.itemId, authSession?.userId || "")
        : false;

    if (!item) {
        return <h1>Item not found</h1>;
    }

    const remainingDuration = getRemainingDurationFormatted(item.endingAt);
    return (
        <>
            <div className="flex w-full gap-10">
                <Image
                    src={item.imageUrl}
                    alt={item.name}
                    width={400}
                    height={400}
                    className="w-1/3 rounded border p-3"
                />

                <div className="flex flex-1 flex-col gap-4">
                    <div className="flex items-center justify-between">
                        <div className="text-3xl">{item.name}</div>
                        <LikeBtn
                            itemId={item.id}
                            numLikes={item.likes}
                            userLikes={userLikes}
                        />
                    </div>
                    <Link
                        href={`/users/${item.ownerId}`}
                        className="inline-block self-start text-primary underline hover:text-primary/80"
                    >
                        See the seller
                    </Link>
                    <p>{item.description}</p>

                    <hr />
                    <div className="flex justify-around">
                        <ItemStat
                            label="High Bid"
                            value={"$" + item.price.toFixed(2)}
                        />
                        <ItemStat
                            bgColor="bg-amber-500"
                            label="# Bids"
                            value={item.bids}
                        />
                        <ItemStat
                            bgColor="bg-emerald-500"
                            label="Ending In"
                            value={remainingDuration}
                        />
                    </div>

                    <Card>
                        <CardHeader>
                            <CardTitle>Place a Bid</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <Input
                                // type="number"
                                placeholder={`$${(item.price + 0.01).toFixed(2)} minimum`}
                                className="w-full p-2"
                            />
                        </CardContent>
                        <CardFooter>
                            <Button className="w-full bg-primary p-2 text-white">
                                Place Bid
                            </Button>
                        </CardFooter>
                    </Card>
                </div>
            </div>
            <div className="my-8">
                <div className="text-xl">Bid History</div>
                <div className="mx-3 my-2">
                    {/* <Chart bidHistory={history} /> */}
                </div>
            </div>
        </>
    );
};
export default ItemDetailPage;
