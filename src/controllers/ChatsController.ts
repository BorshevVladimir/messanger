import { ChatsApi } from '../api/ChatsApi'
import { store } from '../store/Store'
import type { ChatInfo, ChatUser } from '../typings'
import { messagesController } from './MessagesController'
import { userController } from './UserController'

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

	async fetchUsers (id: ChatInfo['id']) {
		try {
			const users = await this.api.users(id)
			store.set('chatUsers', users)
		} catch (err) {
			console.error(`Ошибка получения списка пользователей чата: ${err}`)
		}
	}

	async addUser (login: ChatUser['login'], chatId: ChatInfo['id']) {
		const users = await userController.search(login)
		const userId = users?.find(user => user.login === login)?.id
		if (!userId) {
			alert(`Не найден пользователь с логином ${login}`)
			return
		}

		try {
			await this.api.addUsers([userId], chatId)
			await this.fetchUsers(chatId)
		} catch (err) {
			console.error(`Ошибка при добавлении пользователей в чат: ${err}`)
		}
	}

	async deleteUser (userId: ChatUser['id'], chatId: ChatInfo['id']) {
		try {
			await this.api.deleteUser([userId], chatId)
			await this.fetchUsers(chatId)
		} catch (err) {
			console.error(`Ошибка удаления пользователя из чата: ${err}`)
		}
	}
}

const chatsController = new ChatsController()
export { chatsController }
