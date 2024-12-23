export interface User {
    id: string,
    role: "USER" | "ADMIN",
    email: string,
    name: string,
    address: string,
    createdAt: string,
    updatedAt: string
}
