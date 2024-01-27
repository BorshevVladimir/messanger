import { HTTPTransport } from '../api/HTTPTransport'
import type { User } from '../typings'

export type ChangeProfileRequestData = Partial<Omit<User, 'id'>>


export type ChangePasswordRequestData = {
	oldPassword: string
	newPassword: string
}

export class UserApi {
	private http: HTTPTransport

	constructor () {
		this.http = new HTTPTransport('/user')
	}

	changePassword (payload: ChangePasswordRequestData) {
		return this.http.put('/password', { data: payload })
	}

	changeProfile (payload: ChangeProfileRequestData) {
		return this.http.put('/profile', { data: payload })
	}

	changeAvatar (payload: FormData) {
		return this.http.put('/profile/avatar', { data: payload })
	}

	search (login: User['login']): Promise<User[]> {
		return this.http.post<User[]>('/search', { data: { login }})
	}
}
