import * as yup from 'yup'

export const loginSchema = (t: (key: string) => string) =>
    yup.object().shape({
        email: yup
            .string()
            .email(t('invalidEmail'))
            .required(t('emailRequired')),
        password: yup
            .string()
            .required(t('passwordRequired'))
            .matches(
                /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/,
                t('passwordWeak')
            ),
        rememberMe: yup.boolean()
    })

export const signUpSchema = (t: (key: string) => string) =>
    yup.object().shape({
        email: yup
            .string()
            .email(t('invalidEmail'))
            .required(t('emailRequired')),
        password: yup
            .string()
            .required(t('passwordRequired'))
            .matches(
                /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/,
                t('passwordWeak')
            ),
        passwordConfirm: yup
            .string()
            .required(t('passwordRequired'))
            .oneOf([yup.ref('password')], t('passwordMustMatch')),
        name: yup
            .string()
            .min(2, t("validation.nameMinLength"))
            .max(50, t("validation.nameMaxLength"))
            .required(t("nameRequired")),
        address: yup
            .string()
            .required(t("addressRequired"))
    })
