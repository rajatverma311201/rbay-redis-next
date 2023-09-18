import React, { useState } from "react";

interface LikeButtonProps {
    numLikes: number;
    userLikes: boolean;
}

function LikeButton({ numLikes, userLikes }: LikeButtonProps) {
    const [isLiked, setIsLiked] = useState(userLikes);

    const handleLikeClick = () => {
        setIsLiked((prevIsLiked) => !prevIsLiked);
    };

    return (
        <div className="flex items-center">
            <button
                type="button"
                className={`flex w-full items-center rounded-l-md border-b border-l border-t bg-white px-4 py-2 text-base font-medium text-black hover:bg-gray-100 ${
                    isLiked ? "bg-green-200" : ""
                }`}
                onClick={handleLikeClick}
            >
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    className="mr-2 h-4 w-4"
                    fill="currentColor"
                    viewBox="0 0 1792 1792"
                >
                    <path d="M1728 647q0 22-26 48l-363 354 86 500q1 7 1 20 0 21-10.5 35.5t-30.5 14.5q-19 0-40-12l-449-236-449 236q-22 12-40 12-21 0-31.5-14.5t-10.5-35.5q0-6 2-20l86-500-364-354q-25-27-25-48 0-37 56-46l502-73 225-455q19-41 49-41t49 41l225 455 502 73q56 9 56 46z" />
                </svg>
                {isLiked ? "Liked" : "Like"}
            </button>
            <button className="w-full cursor-default rounded-r-md border bg-white px-4 py-2 text-base font-medium text-black">
                {numLikes}
            </button>
        </div>
    );
}

export default LikeButton;
