const CATEGORY_ENDPOINT = {
    categories: '/category',
    delete: (id: string) => '/category/' + id,
    create: '/category/',
    update: (id: string) => '/category/' + id,
}

export default CATEGORY_ENDPOINT
