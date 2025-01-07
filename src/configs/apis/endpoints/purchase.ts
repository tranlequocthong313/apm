const PURCHASE_ENDPOINT = {
    create: '/purchase/',
    purchases: '/purchase/',
    review: (id: string) => '/purchase/review/' + id,
    detail: (id: string) => '/purchase/' + id,
}

export default PURCHASE_ENDPOINT
