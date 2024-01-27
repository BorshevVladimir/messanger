import { Block } from '../../../utils/Block'
import template from './chat-message.hbs'
import type { Message } from '../../../typings'
import './chat-message.scss'

type ChatMessageProps = {
	content: Message['content'],
	time: Message['time']
	username: string,
	isMine: boolean
}

export class ChatMessage extends Block {
	constructor (props: ChatMessageProps) {
		super(props)
	}

	render () {
		return this.compile(template, this.props)
	}
}
