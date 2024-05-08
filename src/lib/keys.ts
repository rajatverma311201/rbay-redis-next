export const getPageCacheKey = (route: string) => `pageCache#${route}`;

export const getUserKey = (userId: string) => `users#${userId}`;

export const getSessionKey = (sessionId: string) => `sessions#${sessionId}`;
