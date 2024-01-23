import { Block } from '../../../utils/Block'
import template from './chat-users.hbs'
import { withStore } from '../../../store/Store'
import { chatsController } from '../../../controllers/ChatsController'
import { Input } from '../input'
import { ChatUser } from '../../../typings'
import './chat-users.scss'

type ChatUsersProps = {
	onUserAdd: () => void
	onUserDelete: () => void
}

export class ChatUsersBase extends Block {
	constructor (props: ChatUsersProps) {
		super({
			...props,
			onUserAdd: () => {
				const input = this.refs['user-login'].element as HTMLInputElement
				const login = input.value.trim()
				if (login) {
					chatsController.addUser(login, this.props.selectedChat)
					;(this.refs['user-login'] as Input).clear()
				}
			},
			onUserDelete: (userId: ChatUser['id']) => {
				chatsController.deleteUser(userId, this.props.selectedChat)
			},
		})
	}
	render () {
		const newUsers = this.props.users?.map((user) => ({
			...user,
			onDelete: () => {
				this.props.onUserDelete(user.id)
			},
		}))
		return this.compile(template, { ...this.props, users: newUsers })
	}
}

const withUsers = withStore((state) => ({
	selectedChat: state.selectedChat,
	users: [...(state?.chatUsers || []).map(user => ({...user, isAdmin: user.role === 'admin' }))]
}))

export const ChatUsers = withUsers(ChatUsersBase)
