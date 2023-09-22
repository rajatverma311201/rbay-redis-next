import Card from "@/components/Card";
import Carousel from "@/components/Carousel";
import { Item } from "@/types";
import Image from "next/image";

export default function Home() {
    const endingSoonest: Item[] = [];
    const mostViews: Item[] = [];
    const highestPrice: Item[] = [];

    return (
        <div>
            <h1 className="text-3xl">Most Expensive</h1>
            <Carousel>
                {highestPrice.map((item) => (
                    <div key={item.id}>
                        <Card item={item} showViews />
                    </div>
                ))}
            </Carousel>

            <hr className="my-8" />

            <h1 className="text-3xl">Ending Soonest</h1>
            <Carousel>
                {endingSoonest.map((item) => (
                    <div key={item.id}>
                        <Card item={item} showViews />
                    </div>
                ))}
            </Carousel>

            <hr className="my-8" />

            <h1 className="text-3xl">Most Views</h1>
            <Carousel>
                {mostViews.map((item) => (
                    <div key={item.id}>
                        <Card item={item} showViews />
                    </div>
                ))}
            </Carousel>
        </div>
    );
}
