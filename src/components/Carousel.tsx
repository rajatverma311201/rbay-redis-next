"use client";

import React, { useState, useEffect } from "react";
import { motion, useAnimation } from "framer-motion";

type CarouselProps = {
    children: React.ReactNode;
};

function Carousel({ children }: CarouselProps) {
    const [scrollBy, setScrollBy] = useState(300);
    const [offset, setOffset] = useState(0);
    const controls = useAnimation();

    useEffect(() => {
        if (typeof window !== "undefined") {
            setScrollBy(window.innerWidth / 2);
        }
    }, []);

    const goLeft = () => {
        if (offset - scrollBy > 0) {
            controls.start({
                x: offset - scrollBy,
                transition: { duration: 0.4, ease: "cubicOut" },
            });
            setOffset(offset - scrollBy);
        } else {
            controls.start({
                x: 0,
                transition: { duration: 0.4, ease: "cubicOut" },
            });
            setOffset(0);
        }
    };

    const goRight = () => {
        const container = document.querySelector("#container-carousel"); // Adjust the selector as needed
        const scroller = document.querySelector("#container-scroller"); // Adjust the selector as needed

        if (container && scroller) {
            const containerWidth = container.getBoundingClientRect().width;
            const scrollerWidth = scroller.scrollWidth;

            if (offset + scrollBy > scrollerWidth - containerWidth) {
                controls.start({
                    x: scrollerWidth - containerWidth,
                    transition: { duration: 0.4, ease: "cubicOut" },
                });
                setOffset(scrollerWidth - containerWidth);
            } else {
                controls.start({
                    x: offset + scrollBy,
                    transition: { duration: 0.4, ease: "cubicOut" },
                });
                setOffset(offset + scrollBy);
            }
        }
    };

    return (
        <div className="relative my-2 w-full rounded bg-gray-100 p-4">
            <div className="absolute inset-y-1/2 z-10">
                <motion.button
                    onClick={goLeft}
                    style={{ transform: "translate(-50%, -50%)" }}
                    className="flex cursor-pointer items-center rounded-full bg-gray-800 p-3 text-center uppercase transition duration-100 ease-in hover:bg-gray-600 hover:text-white focus:outline-none"
                    whileTap={{ scale: 0.95 }}
                >
                    &lt;
                </motion.button>
            </div>
            <div className="relative overflow-hidden" id="container-carousel">
                <motion.div
                    className="relative flex min-h-[200px]"
                    style={{ x: offset }}
                    id="container-scroller"
                    animate={controls}
                >
                    {children}
                </motion.div>
            </div>
            <div className="absolute inset-y-1/2 right-0 z-10">
                <motion.button
                    onClick={goRight}
                    style={{ transform: "translate(50%, -50%)" }}
                    className="flex cursor-pointer items-center rounded-full bg-gray-800 p-3 text-center uppercase transition duration-100 ease-in hover:bg-gray-600 hover:text-white focus:outline-none"
                    whileTap={{ scale: 0.95 }}
                >
                    &gt;
                </motion.button>
            </div>
        </div>
    );
}

export default Carousel;
