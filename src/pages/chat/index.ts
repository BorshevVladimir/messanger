import { withStore } from '../../store/Store'
import { Block } from '../../utils/Block'
import template from './chat.hbs'
import { chatsController } from '../../controllers/ChatsController'
import type { ChatInfo } from '../../typings'
import './chat.scss'

type ChatPageProps = {
	chats: ChatInfo[],
	selectedChat: number
}

class ChatPageBase extends Block {
	constructor (props: ChatPageProps) {
		super(props)
	}

	async init () {
		await chatsController.fetchChats()
	}

	render () {
		return this.compile(template, this.props)
	}
}

const withChats = withStore((state) => ({ chats: [ ...(state.chats || []) ], selectedChat: state.selectedChat }))

export const ChatPage = withChats(ChatPageBase)
