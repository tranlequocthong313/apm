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

export default loginSchema
