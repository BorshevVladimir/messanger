import { HTTPTransport } from './HTTPTransport'
import type { User, UserId } from '../typings'

export type SignupRequestData = {
	first_name: string
	second_name: string
	login: string
	email: string
	password: string
	phone: string
}

type SignupResponseData = {
	id: UserId
}

export type SigninRequestData = {
	login: 'string'
	password: 'string'
}



export class AuthApi {
	private http: HTTPTransport

	constructor () {
		this.http = new HTTPTransport('/auth')
	}

	async signup (payload: SignupRequestData): Promise<SignupResponseData> {
		return this.http.post('/signup', { data: payload })
	}

	signin (payload: SigninRequestData) {
		return this.http.post('/signin', { data: payload })
	}

	async user (): Promise<User> {
		return this.http.get('/user')
	}

	async logout (): Promise<void> {
		return this.http.post('/logout')
	}
}
