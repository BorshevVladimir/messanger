import { UserApi, type ChangePasswordRequestData, type ChangeProfileRequestData } from '../api/UserApi'
import { router } from '../router/Router'
import { authController } from './AuthController'

export class UserController {
	private readonly api: UserApi = new UserApi()

	async chagePassword (data: ChangePasswordRequestData) {
		try {
			await this.api.changePassword(data)
			alert('Пароль успешо изменен')
			router.go('/messenger')
		} catch (err) {
			console.error(err)
		}
	}

	async changeProfile (data: ChangeProfileRequestData) {
		try {
			await this.api.changeProfile(data)
			alert('Профиль успешо изменен')
			await authController.fetchUser()
			router.go('/messenger')
		} catch (err) {
			console.error(err)
		}
	}
}

const userController = new UserController()

export { userController }
