import {
	AuthApi,
	type SignupRequestData,
	type SigninRequestData,
} from '../api/AuthApi'

import { store } from '../store/Store'

import { router } from '../router/Router'

export class AuthController {
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
			this.api.signup(data)
			router.go('/')
		} catch (err) {
			console.error(err)
		}
	}

	async fetchUser () {
		const user = await this.api.user()
		store.set('user', user)
	}
}
