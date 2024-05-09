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
}
