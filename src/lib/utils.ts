import { randomBytes } from "crypto";
import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { formatDuration, intervalToDuration } from "date-fns";

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

export const genId = () => {
    return randomBytes(3).toString("hex");
};

export const getRemainingDurationFormatted = (endingAt: number) => {
    const currDate = new Date();
    const dur = intervalToDuration({
        start: currDate,
        end: endingAt,
    });

    const formDur = formatDuration(dur, {
        format: ["days", "hours", "minutes", "seconds"],
        delimiter: ", ",
    })
        .replace("hours", "hrs")
        .replace("minutes", "min")
        .replace("seconds", "sec");

    const arr = formDur.split(",");
    const newArr = arr.slice(0, Math.min(2, arr.length));
    return newArr.join(", ");
};

export const createImageUrl = () => {
    return `https://realrealreal-redis.s3.amazonaws.com/${~~(Math.random() * 198) + 1}.jpg`;
};

export class DateTime {
    private _date: Date;
    constructor(date: Date) {
        this._date = date;
    }

    static toMilliseconds(date: Date) {
        return date.getTime();
    }

    // static toMilliseconds() {
    //     return this._date.getTime();
    // }

    static fromMilliseconds(milliseconds: number) {
        return new Date(milliseconds);
    }

    static fromString(dateString: string) {
        return new Date(dateString);
    }
}
