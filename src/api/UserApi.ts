import { HTTPTransport } from '../api/HTTPTransport'

export type UserUpdateRequestData = {
	first_name: string
	second_name: string
	display_name: string
	login: string
	email: string
	phone: string
}

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
}
