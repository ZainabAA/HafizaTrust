import { AuthRequest } from "./auth/auth";

export interface Note {
    _id: string,
    topic: string[],
    title: string,
    body: string,
    user: AuthRequest,
    __v: number
}
