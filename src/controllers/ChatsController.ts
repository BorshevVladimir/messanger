import { ChatsApi } from '../api/ChatsApi'
import { store } from '../store/Store'

class ChatsController {
	private readonly api: ChatsApi = new ChatsApi()

	async fetchChats () {
		const chats = await this.api.read()
		store.set('chats', chats)
	}
}

const chatsController = new ChatsController()
export { chatsController }
