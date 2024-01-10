import { UserApi, type ChangePasswordRequestData } from '../api/UserApi'
import { router } from '../router/Router'

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
}

const userController = new UserController()

export { userController }
