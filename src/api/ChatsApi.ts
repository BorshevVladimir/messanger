import { HTTPTransport } from '../api/HTTPTransport'
import { ChatInfo } from '../typings'

export class ChatsApi {
	private http: HTTPTransport

	constructor () {
		this.http = new HTTPTransport('/chats')
	}

	create (name: string) {
		return this.http.post('/', { data: { title: name }})
	}

	read (): Promise<ChatInfo[]> {
		return this.http.get('/')
	}

	async getToken (id: ChatInfo['id']): Promise<string> {
		const response = await this.http.post<{ token: string }>(`/token/${id}`)
		return response.token
	}
}
