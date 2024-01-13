import { Block } from '../../utils/Block'
import template from './profile-settings.hbs'
import './profile-settings.scss'
import { InputValidator } from '../../utils/InputValidator'
import { getFormData } from '../../utils/formSubmit'
import type { FormTextField } from '../../typings'
import { router } from '../../router/Router'
import { withStore } from '../../store/Store'
import { userController } from '../../controllers/UserController'

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
		for (const key in formInputs) {
			formInputs[key].value = this.props[key] as string
		}

		this.setProps({
			formInputs,
			goToChatPage (e: MouseEvent) {
				e.preventDefault()
				router.go('/messenger')
			},
			onSubmit: (e: SubmitEvent) => {
				e.preventDefault()
				// TODO: Add validation
				const formData = getFormData(e.target as HTMLFormElement)
				userController.changeProfile(formData)
			},
			onAvatarChange: (data: FormData) => {
				userController.changeAvatar(data)
			}
		})
	}

	render () {
		return this.compile(template, this.props)
	}
}

const withUser = withStore(state => {
	return {...state.user, avatar: `https://ya-praktikum.tech/api/v2/resources${state.user?.avatar}` }
})

export const ProfileSettingsPage = withUser(ProfileSettingsPageBase)
