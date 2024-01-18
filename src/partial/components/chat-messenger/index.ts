import { chatsController } from '../../../controllers/ChatsController'
import { messagesController } from '../../../controllers/MessagesController'
import { withStore } from '../../../store/Store'
import { ChatUser } from '../../../typings'
import { Block } from '../../../utils/Block'
import template from './chat-messenger.hbs'
import './chat-messenger.scss'

type ChatMessengerProps = {
	id: number
	avatarSrc: string
	avatarAlt: string
	title: string
	lastMessage?: string
	lastMessageTime?: string
	messageCount?: number
}

class ChatMessengerBase extends Block {
	constructor (props: ChatMessengerProps) {
		super({
			...props,
			attachHandle: () => {
				this.refs['attach-block'].showToggle()
			},
			togglePopupUsersHandle: () => {
				this.refs['popup-chat-users'].showToggle()
			},
			addUserHandle: () => {
				this.refs['popup-add-user'].showToggle()
			},
			deleteChatHandle: () => {
				this.refs['popup-confirm-delete'].show()
			},
			onChatDeleteConfirm: () => {
				chatsController.deleteChat(this.props.chatInfo.id)
				this.refs['popup-confirm-delete'].hide()
			},
			onChatDeleteCancel: () => {
				this.refs['popup-confirm-delete'].hide()
			},
			sendMessage: () => {
				const input = this.refs['messenger-input'].element as HTMLInputElement
				const message = input.value
				if (message) {
					messagesController.sendMessage(this.props.chatInfo.id, message)
					input.value = ''
				}
			},
			onUserAdd: (login: ChatUser['login']) => {
				chatsController.addUser(login, this.props.chatInfo.id)
				this.refs['popup-chat-users'].clearInput()
			}
		})
	}

	init () {
		chatsController.fetchUsers(this.props.chatInfo.id)
	}
	render () {
		return this.compile(template, this.props)
	}
}

const withChat = withStore(state => {
	const chatId = state.selectedChat
	const chatInfo = state.chats?.find(chat => chat.id === chatId)
	const chatUsers = [...(state.chatUsers || [])]

	if (!chatId || !chatInfo) {
		return {
			messages: [],
			chatInfo: undefined,
			chatUsers
		}
	}

	return {
		messages: state?.messages?.[chatId] || [], // TODO: Вывести, но сейчас все чаты пустые
		chatInfo: { ...chatInfo, avatar: `https://ya-praktikum.tech/api/v2/resources${chatInfo.avatar}`},
		chatUsers: [...chatUsers.map(user => ({...user, isAdmin: user.role === 'admin' }))]
	}
})

export const ChatMessenger = withChat(ChatMessengerBase)
