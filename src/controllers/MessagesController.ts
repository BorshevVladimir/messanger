import { store } from '../store/Store'
import { ChatInfo, Message } from '../typings'
import { WSTransport, WSTransportEvents } from '../utils/WSTransport'

class MessagesController {
	private _sockets: Map<ChatInfo['id'], WSTransport> = new Map()

	async connect (id: ChatInfo['id'], token: string) {
		if(this._sockets.has(id)) {
			return
		}

		const userId = store.getState().user!.id

		const wsTransport = new WSTransport(`wss://ya-praktikum.tech/ws/chats/${userId}/${id}/${token}`)
		this._sockets.set(id, wsTransport)

		await wsTransport.connect()

		this._subscribe(wsTransport, id)
		this.fetchOldMessages(id)
	}

	private _subscribe (transport: WSTransport, id: ChatInfo['id']) {
		transport.on(WSTransportEvents.Message, (message) => this._onMessage(id, message))
		transport.on(WSTransportEvents.Close, () => this._onClose(id))
	}

	public sendMessage (id: ChatInfo['id'], message: string) {
		const socket = this._sockets.get(id)

		if (!socket) {
			throw new Error(`Чат ${id} не подключен`)
		}

		socket.send({
			type: 'message',
			content: message
		})
	}

	public fetchOldMessages (id: ChatInfo['id']) {
		const socket = this._sockets.get(id)
		if (!socket) {
			throw new Error(`Чат ${id} не подключен`)
		}

		socket.send({ type: 'get old', content: '0' })
	}

	public closeAll () {
		Array.from(this._sockets.values()).forEach(socket => socket.close())
	}

	private _onMessage (id: ChatInfo['id'], messages: Message | Message[]) {
		let messagesToAdd: Message[] = []

		if (Array.isArray(messages)) { // Пришли старые сообщения
			messagesToAdd = messages.reverse()
		} else { // Пришло новое сообщение
			messagesToAdd.push(messages)
		}

		const currentMessages = (store.getState().messages || {})[id] || []

		messagesToAdd = [...currentMessages, ...messagesToAdd]
		store.set(`messages.${id}`, messagesToAdd)
	}

	private _onClose (id: ChatInfo['id']) {
		this._sockets.delete(id)
	}
}

const messagesController = new MessagesController()

export { messagesController }
