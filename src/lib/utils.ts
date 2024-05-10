import { randomBytes } from "crypto";
import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

export const genId = () => {
    return randomBytes(3).toString("hex");
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
