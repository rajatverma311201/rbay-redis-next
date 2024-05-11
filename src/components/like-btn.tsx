"use client";

import { Star } from "lucide-react";
import { Button } from "./ui/button";
import { likeAnItem, unlikeAnItem } from "@/actions/items";
import { useRouter } from "next/navigation";
import { useState } from "react";

interface LikeBtnProps {
    itemId: string;
    numLikes: number;
    userLikes: boolean;
}

export const LikeBtn: React.FC<LikeBtnProps> = ({
    itemId,
    numLikes,
    userLikes,
}) => {
    const [submitting, setSubmitting] = useState(false);
    const router = useRouter();

    async function onClickLike() {
        if (submitting) {
            return;
        }

        setSubmitting(true);
        try {
            if (userLikes) {
                await unlikeAnItem(itemId);
            } else {
                await likeAnItem(itemId);
            }

            router.refresh();
        } catch (err) {
        } finally {
            setSubmitting(false);
        }
    }

    return (
        <div className="flex justify-center">
            <Button
                onClick={onClickLike}
                variant={"outline"}
                className="flex items-center rounded-r-none border-r-0"
                disabled={submitting}
            >
                {!userLikes ? (
                    <Star className="mr-2 text-primary" size={18} />
                ) : (
                    <Star
                        className="mr-2 fill-primary text-primary"
                        size={18}
                    />
                )}
                <span>{userLikes ? "Liked" : "Like"}</span>
            </Button>
            <Button
                variant={"outline"}
                disabled
                className="rounded-l-none disabled:opacity-100"
            >
                {numLikes}
            </Button>
        </div>
    );
};
