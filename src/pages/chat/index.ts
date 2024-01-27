import { withStore, store } from '../../store/Store'
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
		super({
			...props,
			userPageClickHandle: () => {
				this.refs['settings-overlay'].show()
			},
			closeOverlayHandle: () => {
				this.refs['settings-overlay'].hide()
			},
			addChatHandle: () => {
				this.refs['popup-add-chat'].showToggle()
			},
			onFilterChange: (e: InputEvent) => {
				const { value } = e.target as HTMLInputElement
				store.set('chatsFilter', value)
			}
		})
	}

	async init () {
		await chatsController.fetchChats()
	}

	render () {
		return this.compile(template, this.props)
	}
}

const withChats = withStore((state) => {
	let chats: ChatInfo[] = state.chats || []

	const filterValue = state.chatsFilter || ''

	if (filterValue) {
		chats = chats.filter(chat => {
			return chat.title.toLocaleLowerCase().includes(filterValue.toLocaleLowerCase())
		})
	}

	return { chats: [ ...chats ], selectedChat: state.selectedChat, chatsFilter: state.chatsFilter }
})

export const ChatPage = withChats(ChatPageBase)
