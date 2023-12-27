import { Block } from '../../utils/Block'
import template from './profile-change-password.hbs'
import './profile-change-password.scss'
import { InputValidator } from '../../utils/InputValidator'
import { formSubmit } from '../../utils/formSubmit'
import type { FormInput } from '../../typings/FormInput'
import { router } from '../../router/Router'

const formInputs: Record<string, FormInput> = {
	old_password: {
		ref: 'password',
		label: 'Старый пароль',
		placeholder: 'Введите старый пароль',
		error: 'Неподходящий пароль',
		type: 'password',
		validator: InputValidator.validatePassword,
	},
	password: {
		ref: 'password',
		label: 'Новый пароль',
		placeholder: 'Введите новый пароль',
		error: 'Неподходящий пароль',
		type: 'password',
		validator: InputValidator.validatePassword,
	},
	password_repeat: {
		ref: 'password_repeat',
		label: 'Новый пароль (еще раз)',
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
			goToChatPage (e: MouseEvent) {
				e.preventDefault()
				router.go('/messenger')
			},
			onSubmit: (e: SubmitEvent) => formSubmit(e, formInputs, this.refs)
		})
	}
	render () {
		return this.compile(template, this.props)
	}
}
