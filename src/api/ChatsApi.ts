import { HTTPTransport } from '../api/HTTPTransport'
import { ChatInfo, ChatUser } from '../typings'

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

	delete (id: ChatInfo['id']): Promise<void> {
		return this.http.delete('/', { data: {chatId: id } })
	}

	async getToken (id: ChatInfo['id']): Promise<string> {
		const response = await this.http.post<{ token: string }>(`/token/${id}`)
		return response.token
	}

	users (id: ChatInfo['id']) {
		return this.http.get(`/${id}/users`)
	}

	addUsers (userIds: Array<ChatUser['id']>, chatId: ChatInfo['id']) {
		return this.http.put('/users', {
			data: {
				users: userIds, chatId
			}
		})
	}

	deleteUser (userIds: Array<ChatUser['id']>, chatId: ChatInfo['id']) {
		return this.http.delete('/users', {
			data: {
				users: userIds,
				chatId
			}
		})
	}
}
