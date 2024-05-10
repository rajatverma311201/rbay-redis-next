declare module "types" {
    export interface CreateUserAttrs {
        username: string;
        password: string;
    }
    export interface Session {
        id: string;
        userId: string;
        username: string;
    }
    export interface CreateItemAttrs {
        name: string;
        imageUrl: string;
        description: string;
        createdAt: Date;
        endingAt: Date;
        ownerId: string;
        highestBidUserId: string;
        status: string;
        price: number;
        views: number;
        likes: number;
        bids: number;
    }
}
