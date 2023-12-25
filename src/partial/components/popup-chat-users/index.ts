import { Block } from '../../../utils/Block'
import template from './popup-chat-users.hbs'
import './popup-chat-users.scss'

type PopupChatUsersProps = {
	users: {
		name: string,
		avatarSrc: string
		avatarAlt: string
	}[]
}

export class PopupChatUsers extends Block {
	constructor (props: PopupChatUsersProps) {
		super(props)
	}
	render () {
		return this.compile(template, this.props)
	}
}
