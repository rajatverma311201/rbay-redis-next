export const pageCacheKey = (pageId: string) => `pageCache#${pageId}`;
export const sessionsKey = (sessionId: string) => `sessions#${sessionId}`;

/***************    USERS     ***************/
export const usersKey = (userId: string) => `users#${userId}`;
export const usernamesUniqueKey = () => "usernames:unique";
export const userLikesItemKey = (userId: string) => `user:likes:item#${userId}`;
export const usernamesKey = () => "usernames";

/***************    ITEMS     ***************/
export const itemsKey = (itemId: string) => `items#${itemId}`;
export const itemsByViewsKey = () => "items:views";
export const itemsByEndingAtKey = () => "items:endingAt";
export const itemsViewsKey = (itemId: string) => `items:views#${itemId}`;
export const itemsBidHistoryKey = (itemId: string) =>
    `items:bidHistory#${itemId}`;
