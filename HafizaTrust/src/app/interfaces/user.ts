export interface User {
    username: string;
    image: string;
    balance: number;
    _id: string;
}

export interface ImageInput {
    image: string;
}

export interface UserUpdateResponse {
    message: string;
    fields: ImageInput;
}