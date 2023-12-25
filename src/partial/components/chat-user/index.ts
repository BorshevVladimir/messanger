import { Block } from '../../../utils/Block'
import template from './chat-user.hbs'
import './chat-user.scss'

type ChatUserProps = {
	avatarSrc: string
	avatarAlt: string
	name: string
	lastMessage?: string
	lastMessageTime?: string
	messageCount?: number
}

export class ChatUser extends Block {
	constructor (props: ChatUserProps) {
		super(props)
	}
	render () {
		return this.compile(template, this.props)
	}
}
