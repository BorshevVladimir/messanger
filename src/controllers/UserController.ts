import { UserApi, type ChangePasswordRequestData, type ChangeProfileRequestData } from '../api/UserApi'
import { router } from '../router/Router'
import { authController } from './AuthController'
import { User } from '../typings'

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

	async changeAvatar (data: FormData) {
		try {
			await this.api.changeAvatar(data)
			alert('Аватарка пользователя успешо изменена')
			await authController.fetchUser()
		} catch (err) {
			console.error(err)
		}
	}

	async search (login: User['login']) {
		try {
			const users = await this.api.search(login)
			return users
		} catch (err) {
			console.error(`Ошибка получения списка пользователей ${err}`)
		}
	}
}

const userController = new UserController()

export { userController }
