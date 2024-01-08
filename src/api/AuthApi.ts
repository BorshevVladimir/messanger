import { HTTPTransport } from './HTTPTransport'

export type SignupRequestData = {
	first_name: string
	second_name: string
	login: string
	email: string
	password: string
	phone: string
}

type UserId = number
type SignupResponseData = {
	id: UserId
}

export type SigninRequestData = {
	login: 'string'
	password: 'string'
}

export type UserInfo = {
	id: UserId
	first_name: string
	second_name: string
	display_name: string
	phone: string
	login: string
	avatar: string
	email: string
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

	async user (): Promise<UserInfo> {
		return this.http.get('/user')
	}

	async logout (): Promise<void> {
		return this.http.post('/logout')
	}
}
