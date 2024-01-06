import { Block } from '../../utils/Block'
import template from './login.hbs'
import './login.scss'
import { InputValidator } from '../../utils/InputValidator'
import type { FormInput } from '../../typings/FormInput'
import { getFormData } from '../../utils/formSubmit'
import { router } from '../../router/Router'
import { authController } from '../../controllers/AuthController'
import type { SigninRequestData } from '../../api/AuthApi'

const formInputs: Record<string, FormInput> = {
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
			onSubmit: (e: SubmitEvent) => {
				e.preventDefault()
				const formData = getFormData(e.target as HTMLFormElement)
				authController.signin(formData as SigninRequestData)
			}
		})
	}

	render () {
		return this.compile(template, this.props)
	}
}
