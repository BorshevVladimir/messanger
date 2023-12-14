import { Block } from '../../utils/Block'
import template from './profile-change-password.hbs'
import './profile-change-password.scss'
import { InputValidator } from '../../utils/InputValidator'
import { formSubmit } from '../../utils/formSubmit'
import type { FormInput } from '../../typings/FormInput'
import { renderDOM } from '../../utils/renderDOM'

const formInputs: Record<string, FormInput> = {
	password: {
		ref: 'password',
		label: 'Пароль',
		placeholder: 'Введите пароль',
		error: 'Неподходящий пароль',
		type: 'password',
		validator: InputValidator.validatePassword,
	},
	password_repeat: {
		ref: 'password_repeat',
		label: 'Пароль (еще раз)',
		placeholder: 'Повторите ввод пароля',
		error: 'Неподходящий пароль',
		type: 'password',
		validator: InputValidator.validatePassword,
	},
}

export class ProfileChangePasswordPage extends Block {
	constructor () {
		super({
			formInputs,
			goToPage (e: MouseEvent) {
				e.preventDefault()
				renderDOM('chat')
			},
			onSubmit: (e: SubmitEvent) => formSubmit(e, formInputs, this.refs)
		})
	}
	render () {
		return this.compile(template, this.props)
	}
}
