export interface TaskData {
    completed: boolean;
    createdAt?: number;
    description: string;
    id: string;
    ownerId: string;
    title: string;
    updatedAt?: number;
}

export interface User {
    _id: string;
    email: string;
    name: string;
}