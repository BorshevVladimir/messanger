import { ChatUser } from '../../../typings'
import { Block } from '../../../utils/Block'
import template from './popup-chat-users.hbs'
import './popup-chat-users.scss'

type PopupChatUsersProps = {
	users: ChatUser[]
}

export class PopupChatUsers extends Block {
	constructor (props: PopupChatUsersProps) {
		super(props)
	}
	render () {
		return this.compile(template, this.props)
	}
}
