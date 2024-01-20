import { Block } from '../../utils/Block'
import template from './login.hbs'
import './login.scss'
import { InputValidator } from '../../utils/InputValidator'
import type { FormErrorDescription, FormTextField } from '../../typings'
import { router } from '../../router/Router'
import { authController } from '../../controllers/AuthController'
import type { SigninRequestData } from '../../api/AuthApi'
import { Indexed } from '../../utils/isObject'

const formInputs: Record<string, FormTextField> = {
	login: {
		ref: 'login',
		label: 'Логин',
		placeholder: 'Введите логин',
		error: 'Ошибка в логине',
		type: 'text',
		validator: InputValidator.validateLogin,
	},
	password: {
		ref: 'password',
		label: 'Пароль',
		placeholder: 'Введите пароль',
		error: 'Ошибка в пароле',
		type: 'password',
		validator: InputValidator.validatePassword,
	},
}

export class LoginPage extends Block {
	constructor () {
		super({
			formInputs,
			goToRegistrationPage (e: MouseEvent) {
				e.preventDefault()
				router.go('/sign-up')
			},
			onFormSubmit: (data: { formValues: Indexed, errors: FormErrorDescription[] }) => {
				if (data.errors.length === 0) {
					authController.signin(data.formValues as SigninRequestData)
				}
			}
		})
	}

	render () {
		return this.compile(template, this.props)
	}
}
