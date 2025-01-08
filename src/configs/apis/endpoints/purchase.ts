const PURCHASE_ENDPOINT = {
    create: '/purchase/',
    purchases: '/purchase/',
    adminPurchases: '/purchase/admin/',
    review: (id: string) => '/purchase/review/' + id,
    detail: (id: string) => '/purchase/' + id,
    delete: (id: string) => '/purchase/' + id,
}

export default PURCHASE_ENDPOINT
