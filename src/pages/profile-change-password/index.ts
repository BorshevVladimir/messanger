import { Block } from '../../utils/Block'
import template from './profile-change-password.hbs'
import './profile-change-password.scss'
import { InputValidator } from '../../utils/InputValidator'
import type { FormTextField, FormErrorDescription } from '../../typings'
import { router } from '../../router/Router'
import { userController } from '../../controllers/UserController'
import type { ChangePasswordRequestData } from '../../api/UserApi'
import { Indexed } from '../../utils/isObject'

const formInputs: Record<string, FormTextField> = {
	old_password: {
		label: 'Старый пароль',
		placeholder: 'Введите старый пароль',
		error: 'Неподходящий пароль',
		type: 'password',
		validator: InputValidator.validatePassword,
	},
	password: {
		label: 'Новый пароль',
		placeholder: 'Введите новый пароль',
		error: 'Неподходящий пароль',
		type: 'password',
		validator: InputValidator.validatePassword,
	},
	password_repeat: {
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
			onFormSubmit: (data: { formValues: Indexed, errors: FormErrorDescription[] }) => {
				const { old_password: oldPassword, password: newPassword, password_repeat: passwordRepeat } = data.formValues

				if (newPassword !== passwordRepeat) {
					alert('Пароли не совпадают')
					return
				}

				if (data.errors.length === 0) {
					userController.chagePassword({ oldPassword, newPassword } as ChangePasswordRequestData)
				}
			}
		})
	}
	render () {
		return this.compile(template, this.props)
	}
}
