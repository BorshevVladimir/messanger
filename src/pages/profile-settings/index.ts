import { Block } from '../../utils/Block'
import template from './profile-settings.hbs'
import './profile-settings.scss'
import { InputValidator } from '../../utils/InputValidator'
import { formSubmit } from '../../utils/formSubmit'
import type { FormTextField } from '../../typings/FormTextField'
import { router } from '../../router/Router'
import { withStore } from '../../store/Store'

const formInputs: Record<string, FormTextField> = {
	email: {
		ref: 'email',
		label: 'Почта',
		placeholder: 'Введите электронную почту',
		error: 'Неподходящий email',
		type: 'email',
		validator: InputValidator.validateEmail,
	},
	login: {
		ref: 'login',
		label: 'Логин',
		placeholder: 'Введите логин',
		error: 'Неподходящий логин',
		type: 'text',
		validator: InputValidator.validateLogin,
	},
	first_name: {
		ref: 'name',
		label: 'Имя',
		placeholder: 'Введите имя',
		error: 'Неподходящее имя',
		type: 'text',
		validator: InputValidator.validateName,
	},
	second_name: {
		ref: 'second_name',
		label: 'Фамилия',
		placeholder: 'Введите фамилию',
		error: 'Неподходящая фамилия',
		type: 'text',
		validator: InputValidator.validateName,
	},
	phone: {
		ref: 'phone',
		label: 'Телефон',
		placeholder: 'Введите телефон',
		error: 'Неподходящий телефон',
		type: 'tel',
		validator: InputValidator.validatePhone,
	},
}

class ProfileSettingsPageBase extends Block {
	init () {
		const inputFormWithValues = Object.keys(formInputs).map(key => ({...formInputs[key], value: this.props[key]}))

		this.setProps({
			formInputs: inputFormWithValues,
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

const withUser = withStore(state => {
	return {...state.user}
})

export const ProfileSettingsPage = withUser(ProfileSettingsPageBase)
