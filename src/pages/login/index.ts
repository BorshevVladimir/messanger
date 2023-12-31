import { Block } from '../../utils/Block'
import template from './login.hbs'
import './login.scss'
import { InputValidator } from '../../utils/InputValidator'
import { renderDOM } from '../../utils/renderDOM'
import type { FormInput } from '../../typings/FormInput'
import { formSubmit } from '../../utils/formSubmit'
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
			goToPage (e: MouseEvent) {
				e.preventDefault()
				renderDOM('registration')
			},
			onSubmit: (e: SubmitEvent) => formSubmit(e, formInputs, this.refs)
		})
	}

	render () {
		return this.compile(template, this.props)
	}
}
