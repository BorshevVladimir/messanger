import {
	AuthApi,
	type SignupRequestData,
	type SigninRequestData,
} from '../api/AuthApi'

import { store } from '../store/Store'

import { router } from '../router/Router'
import { messagesController } from './MessagesController'

class AuthController {
	private readonly api: AuthApi = new AuthApi()

	async signin (data: SigninRequestData) {
		try {
			await this.api.signin(data)
			await this.fetchUser()
			router.go('/messenger')
		} catch (err) {
			console.error(err)
		}
	}

	async signup (data: SignupRequestData) {
		try {
			await this.api.signup(data)
			await this.fetchUser()
			router.go('/messenger')
		} catch (err) {
			console.error(err)
		}
	}

	async fetchUser () {
		try {
			const user = await this.api.user()
			store.set('user', user)
		} catch (err) {
			console.error(`Ошибка получения информации о пользователе: ${err}`)
			throw new Error(err) // Эта ошибка отлавливается в main.ts для разграничения доступа
		}
	}

	async logout () {
		try {
			messagesController.closeAll()
			this.api.logout()
			router.go('/')
		} catch(err) {
			console.error(err)
		}
	}
}

const authController = new AuthController()
export { authController }
