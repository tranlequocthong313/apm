export interface Purchase {
    id: string
    userId: string
    productId: string
    amount: number
    totalPrice: string
    reviewNote: number
    reviewComment: string
    createdAt: string
    user: { email: string }
    product: { name: string }
}
