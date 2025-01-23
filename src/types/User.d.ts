export interface User {
    id: number;
    name: string;
    secondName?: string;
    lastName: string;
    surName?: string;
    rut: string;
    email: string;
    cargo: string;
    type: 'ADMIN' | 'USER';
}