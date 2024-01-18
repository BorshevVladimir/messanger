// import { chatsController } from '../../../controllers/ChatsController'
import { ChatUser } from '../../../typings'
import { Block } from '../../../utils/Block'
import template from './popup-chat-users.hbs'
import './popup-chat-users.scss'

type PopupChatUsersProps = {
	users: ChatUser[]
	onAdd: () => void
}

export class PopupChatUsers extends Block {
	constructor (props: PopupChatUsersProps) {
		super({
			...props,
			onUserAdd: () => {
				const input = this.refs['user-login'].element as HTMLInputElement
				const login = input.value.trim()
				if (login) {
					this.props.onAdd(login)
				}
			}
		})
	}

	clearInput () {
		const input = this.refs['user-login'].element as HTMLInputElement
		input.value = ''
	}

	render () {
		console.log('render')
		const newUsers = this.props.users?.map((user) => ({
			...user,
			onDelete: () => {
				this.props.onDelete(user.id)
			},
		}))

		return this.compile(template, { ...this.props, users: newUsers })
	}
}
