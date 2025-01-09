import * as yup from 'yup'

export const productSchema = yup.object({
    id: yup.string().required(),
    name: yup.string().required(),
    urlName: yup.string().required(),
    picture: yup.string().required(),
    basePrice: yup.number().required(),
    discountPercentage: yup.number().required(),
    stock: yup.number().required(),
    description: yup.string().required(),
    createdAt: yup.string().required(),
    categories: yup.array().of(yup.object({
        id: yup.string().optional(),
        name: yup.string().required(),
    })),
})

export type Product = yup.InferType<typeof productSchema>

export interface Category {
    id?: string
    name: string
}
