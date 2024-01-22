import { Block } from '../../utils/Block'
import template from './registration.hbs'
import { InputValidator } from '../../utils/InputValidator'
import type { FormTextField, FormErrorDescription } from '../../typings'
import './registration.scss'
import { router } from '../../router/Router'
import { authController } from '../../controllers/AuthController'
import type { SignupRequestData } from '../../api/AuthApi'
import { Indexed } from '../../utils/isObject'

const formInputs: Record<string, FormTextField> = {
	email: {
		label: 'Почта',
		placeholder: 'Введите электронную почту',
		error: 'Неподходящий email',
		type: 'email',
		validator: InputValidator.validateEmail,
	},
	login: {
		label: 'Логин',
		placeholder: 'Введите логин',
		error: 'Неподходящий логин',
		type: 'text',
		validator: InputValidator.validateLogin,
	},
	first_name: {
		label: 'Имя',
		placeholder: 'Введите имя',
		error: 'Неподходящее имя',
		type: 'text',
		validator: InputValidator.validateName,
	},
	second_name: {
		label: 'Фамилия',
		placeholder: 'Введите фамилию',
		error: 'Неподходящая фамилии',
		type: 'text',
		validator: InputValidator.validateName,
	},
	phone: {
		label: 'Телефон',
		placeholder: 'Введите телефон',
		error: 'Неподходящий телефон',
		type: 'tel',
		validator: InputValidator.validatePhone,
	},
	password: {
		label: 'Пароль',
		placeholder: 'Введите пароль',
		error: 'Неподходящий пароль',
		type: 'password',
		validator: InputValidator.validatePassword,
	},
	password_repeat: {
		label: 'Пароль (еще раз)',
		placeholder: 'Повторите ввод пароля',
		error: 'Неподходящий пароль',
		type: 'password',
		validator: InputValidator.validatePassword,
	},
}

export class RegistrationPage extends Block {
	constructor () {
		super({
			formInputs,
			goToLoginPage (e: MouseEvent) {
				e.preventDefault()
				router.go('/')
			},
			onFormSubmit: (data: { formValues: Indexed, errors: FormErrorDescription[] }) => {
				if (data.errors.length === 0) {
					authController.signup(data.formValues as SignupRequestData)
				}
			}
		})
	}

	render () {
		return this.compile(template, this.props)
	}
}
