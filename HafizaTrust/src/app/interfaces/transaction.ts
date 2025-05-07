export interface Transaction {
    _id: string,
    type: 'transfer' | 'deposit',
    amount: number,
    from: string,
    to: string,
    createdAt: Date,
    updatedAt: Date,
    __v: number
}

export interface PostResponse {
    msg: string;
}

export interface PostRequest{
    amount: number;
}