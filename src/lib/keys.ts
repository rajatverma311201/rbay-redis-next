export const getPageCacheKey = (route: string) => `pageCache#${route}`;

export const getUserKey = (userId: string) => `users#${userId}`;

export const getSessionKey = (sessionId: string) => `sessions#${sessionId}`;

export const getUsernamesUniqueKey = () => `usernames:unique`;

export const getUsernamesKey = () => `usernames`;

export const getItemKey = (itemId: string) => `items#${itemId}`;

export class Keys {
    static getPageCacheKey(route: string) {
        return `pageCache#${route}`;
    }

    static getUserKey(userId: string) {
        return `users#${userId}`;
    }

    static getSessionKey(sessionId: string) {
        return `sessions#${sessionId}`;
    }

    static getUsernamesUniqueKey() {
        return `usernames:unique`;
    }

    static getUsernamesKey() {
        return `usernames`;
    }

    static getItemKey(itemId: string) {
        return `items#${itemId}`;
    }

    static getUserLikesKey(userId: string) {
        return `users#${userId}:likes`;
    }

    static getItemsByViewsKey() {
        return `items:views`;
    }

    static getItemsByEndingAtKey() {
        return `items:endingAt`;
    }

    static getItemViewsKey(itemId: string) {
        return `items#${itemId}:views`;
    }

    static getBidHistoryKey(itemId: string) {
        return `items#${itemId}:bids`;
    }
}
