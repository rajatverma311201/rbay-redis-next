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
        createdAt: number;
        endingAt: number;
        ownerId: string;
        highestBidUserId: string;
        status: string;
        price: number;
        views: number;
        likes: number;
        bids: number;
    }
    export interface CreateBidAttrs {
        itemId: string;
        userId: string;
        amount: number;
        createdAt: number;
        itemEndingAt: number;
    }
    export interface Bid {
        createdAt: number;
        amount: number;
    }
}
