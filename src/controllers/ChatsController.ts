import { ChatsApi } from '../api/ChatsApi'
import { store } from '../store/Store'
import type { ChatInfo } from '../typings'

class ChatsController {
	private readonly api: ChatsApi = new ChatsApi()

	async fetchChats () {
		const chats = await this.api.read()
		store.set('chats', chats)
	}

	async create (name: string) {
		try {
			await this.api.create(name)
			alert(`Чат "${name}" успешно создан`)
			this.fetchChats()
		} catch (err) {
			console.error(err)
		}
	}

	selectChat (id: ChatInfo['id']) {
		store.set('selectedChat', id)
	}
}

const chatsController = new ChatsController()
export { chatsController }
