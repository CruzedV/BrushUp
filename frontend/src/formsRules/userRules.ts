import { Rule } from "antd/es/form";

export const emailRules: Rule[] = [
  { required: true, message: 'Введите почту' },
  { type: 'email', message: 'Введена не корректная почта' },
]

export const usernameRules: Rule[] = [
  { required: true, message: "Укажите имя пользователя" },
  { min: 4, message: "Минимальная длина 4 символа" },
]

export const passwordRules: Rule[] = [
  { required: true, message: 'Введите пароль' },
    { min: 6, message: 'Минимальная длина 6 символов' },
]

export const notRequiredPasswordRules: Rule[] = [
  { min: 6, message: 'Минимальная длина 6 символов'},
]