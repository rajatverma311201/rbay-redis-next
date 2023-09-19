export const pageCacheKey = (pageId: string) => `pageCache#${pageId}`;
export const usersKey = (userId: string) => `users#${userId}`;
export const sessionsKey = (sessionId: string) => `sessions#${sessionId}`;
export const itemsKey = (itemId: string) => `items#${itemId}`;
export const usernamesUniqueKey = () => "usernames:unique";
export const userLikesItemKey = (userId: string) => `user:likes:item#${userId}`;
