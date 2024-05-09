import { cookies } from "next/headers";
import { decrypt } from "./sessions";
import { getSession } from "@/services/queries/sessions";
import { randomBytes } from "crypto";
import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

export const generateUserId = () => {
    return randomBytes(3).toString("hex");
};
