import * as Yup from 'yup'

const editProductSchema = (t: (key: string) => string) =>
    Yup.object().shape({
        name: Yup.string()
            .required(t('validation.nameRequired'))
            .min(3, t('validation.nameMinLength'))
            .max(100, t('validation.nameMaxLength')),
        basePrice: Yup.number()
            .required(t('validation.basePriceRequired'))
            .min(0, t('validation.basePriceMin')),
        discountPercentage: Yup.number()
            .required(t('validation.discountPercentageRequired'))
            .min(0, t('validation.discountPercentageMin'))
            .max(100, t('validation.discountPercentageMax')),
        stock: Yup.number()
            .required(t('validation.stockRequired'))
            .min(0, t('validation.stockMin'))
            .integer(t('validation.stockInteger')),
        description: Yup.string()
            .required(t('validation.descriptionRequired'))
            .min(10, t('validation.descriptionMinLength'))
            .max(1000, t('validation.descriptionMaxLength')),
        categories: Yup.array()
            .of(Yup.string())
            .optional()
    })

const createProductSchema = (t: (key: string) => string) =>
    editProductSchema(t).shape({
        categories: Yup.array()
            .of(Yup.string())
            .required(t('validation.categoryRequired')),
    })

export { createProductSchema, editProductSchema }
