import { ChatsApi } from '../api/ChatsApi'
import { store } from '../store/Store'
import type { ChatInfo } from '../typings'
import { messagesController } from './MessagesController'

class ChatsController {
	private readonly api: ChatsApi = new ChatsApi()

	async fetchChats () {
		const chats = await this.api.read()

		chats.map(async (chat) => {
			const token = await this.getToken(chat.id)
			await messagesController.connect(chat.id, token)
		})
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

	async deleteChat (id: ChatInfo['id']) {
		await this.api.delete(id)
		alert('Чат успешно удален')
		store.set('selectedChat', undefined)
		this.fetchChats()
	}

	getToken (id: ChatInfo['id']) {
		return this.api.getToken(id)
	}
}

const chatsController = new ChatsController()
export { chatsController }
