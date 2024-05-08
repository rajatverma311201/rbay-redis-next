import { getPageCacheKey } from "@/lib/keys";
import { redisClient } from "@/lib/redis";

const cacheRoutes = ["/about", "/privacy", "/auth/sign-in", "/auth/sign-up"];

export const getCachedPage = async (route: string) => {
    if (!cacheRoutes.includes(route)) {
        return null;
    }

    return await redisClient.get(getPageCacheKey(route));
};

export const setCachedPage = async (route: string, page: string) => {
    if (!cacheRoutes.includes(route)) {
        return null;
    }

    return await redisClient.set(getPageCacheKey(route), page, {
        EX: 2,
    });
};
