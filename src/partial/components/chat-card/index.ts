import { Block } from '../../../utils/Block'
import template from './chat-card.hbs'
import './chat-card.scss'

type ChatCardProps = {
	avatarSrc: string
	avatarAlt: string
	title: string
	lastMessage?: string
	lastMessageTime?: string
	messageCount?: number
}

export class ChatCard extends Block {
	constructor (props: ChatCardProps) {
		super(props)
	}
	render () {
		return this.compile(template, this.props)
	}
}
