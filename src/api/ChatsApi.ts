import { HTTPTransport } from '../api/HTTPTransport'
import { ChatInfo } from '../typings'


export class ChatsApi {
	private http: HTTPTransport

	constructor () {
		this.http = new HTTPTransport('/chats')
	}

	read (): Promise<ChatInfo> {
		return this.http.get('/')
	}
}
