import { chatsController } from '../../../controllers/ChatsController'
import { withStore } from '../../../store/Store'
import { Block } from '../../../utils/Block'
import template from './chat-card.hbs'
import './chat-card.scss'

type ChatCardProps = {
	id: number
	avatarSrc: string
	avatarAlt: string
	title: string
	lastMessage?: string
	lastMessageTime?: string
	messageCount?: number
}

class ChatCardBase extends Block {
	constructor (props: ChatCardProps) {
		super({ ...props, events: { click: () => chatsController.selectChat(props.id) } })
	}
	render () {
		return this.compile(template, {...this.props, isSelected: this.props.id === this.props.selectedChat })
	}
}

const withSelectdChat = withStore(state => ({ selectedChat: state.selectedChat}))

export const ChatCard = withSelectdChat(ChatCardBase)
