import * as Yup from 'yup'

const createCategorySchema = (t: (key: string) => string) =>
    Yup.object().shape({
        name: Yup.string()
            .required(t('validation.nameRequired'))
            .min(3, t('validation.nameMinLength'))
            .max(50, t('validation.nameMaxLength')),
    })

export { createCategorySchema }
