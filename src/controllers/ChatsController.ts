import { ChatsApi } from '../api/ChatsApi'
import { store } from '../store/Store'

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
}

const chatsController = new ChatsController()
export { chatsController }
