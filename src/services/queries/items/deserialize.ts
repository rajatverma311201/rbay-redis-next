export const deserializeItem = (
    itemId: string,
    item: Record<string, string>,
) => {
    return {
        id: itemId,
        name: item.name,
        description: item.description,
        imageUrl: item.imageUrl,
        highestBidUserId: item.highestBidUserId,
        ownerId: item.ownerId,
        createdAt: parseInt(item.createdAt),
        endingAt: parseInt(item.endingAt),
        views: parseInt(item.views),
        likes: parseInt(item.likes),
        bids: parseInt(item.bids),
        price: parseFloat(item.price),
    };
};
