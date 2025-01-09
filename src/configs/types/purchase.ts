import * as yup from 'yup'

export const purchaseSchema = yup.object({
    id: yup.string().required(),
    userId: yup.string().required(),
    productId: yup.string().required(),
    amount: yup.number().required(),
    totalPrice: yup.string().required(),
    reviewNote: yup.number().required(),
    reviewComment: yup.string().required(),
    createdAt: yup.string().required(),
    user: yup.object({
        email: yup.string().required()
    }),
    product: yup.object({
        name: yup.string().required()
    })
})

export type Purchase = yup.InferType<typeof purchaseSchema>
