import { chatsController } from '../../../controllers/ChatsController'
import { messagesController } from '../../../controllers/MessagesController'
import { withStore, store,  } from '../../../store/Store'
import { ChatUser, Message, ChatInfo } from '../../../typings'
import { formatTime } from '../../../utils/formatTime'
import { Block } from '../../../utils/Block'
import template from './chat-messenger.hbs'
import { Input } from '../input'
import './chat-messenger.scss'

type ChatMessengerProps = {
	id: number
	avatarSrc: string
	avatarAlt: string
	title: string
	lastMessage?: string
	lastMessageTime?: string
	messageCount?: number
	togglePopupUsersHandle: () => void
	addUserHandle: () => void
	deleteChatHandle: () => void
	onChatDeleteConfirm: () => void
	onChatDeleteCancel: () => void
	sendMessage: () => void
	onAvatarChange: (data: FormData) => void
	chatInfo: ChatInfo
}

class ChatMessengerBase extends Block<ChatMessengerProps> {
	constructor (props: ChatMessengerProps) {
		super({
			...props,
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
				const input = this.refs['messenger-input'] as Input
				const message = input.getValue()
				if (message) {
					messagesController.sendMessage(this.props.chatInfo.id, message)
					input.clear()
				}
			},
			onAvatarChange: (data: FormData) => {
				data.append('chatId', String(this.props.chatInfo.id))
				chatsController.changeAvatar(data)
			}
		})
	}

	init () {
		const chatId = this.props?.chatInfo?.id
		if (chatId) {
			chatsController.fetchUsers(chatId)
		}
	}
	render () {
		return this.compile(template, this.props)
	}
}

function formatMessages (messages: Message[], chatUsers: ChatUser[]) {
	const currentUserId = store.getState().user?.id

	return messages.map(message => {
		const user = chatUsers.find(user => user.id === message.user_id)
		return {
			...message,
			username: user ? `${user.first_name} ${user.second_name}` : 'Неизвестный пользователь',
			isMine: currentUserId === message.user_id,
			time: formatTime(message.time)
		}
	})
}

const withChat = withStore(state => {
	const chatId = state.selectedChat
	const chatInfo = state.chats?.find(chat => chat.id === chatId)

	if (!chatId || !chatInfo) {
		return {
			messages: [],
			chatInfo: undefined,
		}
	}

	const messages = state?.messages?.[chatId] || []

	return {
		messages: formatMessages(messages, state.chatUsers || []),
		chatInfo: { ...chatInfo, avatar: chatInfo.avatar },
	}
})

export const ChatMessenger = withChat(ChatMessengerBase)
