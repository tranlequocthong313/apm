const CATEGORY_ENDPOINT = {
    categories: '/category',
    delete: (id: string) => '/category/' + id,
    create: '/category/',
    detailByName: (name: string) => '/category/' + name,
    update: (id: string) => '/category/' + id,
}

export default CATEGORY_ENDPOINT
