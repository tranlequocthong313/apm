export interface Product {
    id: string
    name: string
    urlName: string
    picture: string
    basePrice: number
    discountPercentage: number
    stock: number
    description: string
    createdAt: string
    categories?: Category[]
}

export interface Category {
    id?: string
    name: string
}
