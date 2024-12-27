const PRODUCT_ENDPOINT = {
    products: '/product',
    delete: (id: string) => '/product/' + id,
    create: '/product/',
    upload: (id: string) => '/product/picture/' + id,
    update: (id: string) => '/product/' + id,
}

export default PRODUCT_ENDPOINT
