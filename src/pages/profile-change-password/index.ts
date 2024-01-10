import { Block } from '../../utils/Block'
import template from './profile-change-password.hbs'
import './profile-change-password.scss'
import { InputValidator } from '../../utils/InputValidator'
import { getFormData } from '../../utils/formSubmit'
import type { FormTextField } from '../../typings/FormTextField'
import { router } from '../../router/Router'
import { userController } from '../../controllers/UserController'
import type { ChangePasswordRequestData } from '../../api/UserApi'

const formInputs: Record<string, FormTextField> = {
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
			onSubmit: (e: SubmitEvent) => {
				e.preventDefault()
				const formData = getFormData(e.target as HTMLFormElement)
				// TODO: Add validation
				const { old_password: oldPassword, password: newPassword, password_repeat: passwordRepeat } = formData

				if (newPassword !== passwordRepeat) {
					alert('Пароли не совпадают')
					return
				}

				userController.chagePassword({ oldPassword, newPassword } as ChangePasswordRequestData)
			}
		})
	}
	render () {
		return this.compile(template, this.props)
	}
}
