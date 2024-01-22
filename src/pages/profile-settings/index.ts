import { Block } from '../../utils/Block'
import template from './profile-settings.hbs'
import './profile-settings.scss'
import { InputValidator } from '../../utils/InputValidator'
import type { FormTextField, FormErrorDescription } from '../../typings'
import { router } from '../../router/Router'
import { withStore } from '../../store/Store'
import { userController } from '../../controllers/UserController'
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
		error: 'Неподходящая фамилия',
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
}

class ProfileSettingsPageBase extends Block {
	init () {
		this.setProps({
			formInputs,
			goToChatPage (e: MouseEvent) {
				e.preventDefault()
				router.go('/messenger')
			},
			onFormSubmit: (data: { formValues: Indexed, errors: FormErrorDescription[] }) => {
				if (data.errors.length === 0) {
					userController.changeProfile(data.formValues)
				}
			},
			onAvatarChange: (data: FormData) => {
				userController.changeAvatar(data)
			}
		})
	}

	render () {
		const formInputsWithValues = {} as Record<string, FormTextField>
		Object.keys(formInputs).forEach(key => {
			formInputsWithValues[key] = {...formInputs[key], value: this.props[key] as string}
		})

		const newProps = { ...this.props, formInputs: formInputsWithValues}
		return this.compile(template, newProps)
	}
}

const withUser = withStore(state => {
	return { ...state.user, avatar: state.user?.avatar }
})

export const ProfileSettingsPage = withUser(ProfileSettingsPageBase)
