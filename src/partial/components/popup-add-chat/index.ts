import { chatsController } from '../../../controllers/ChatsController'
import { Block } from '../../../utils/Block'
import { getFormData } from '../../../utils/formSubmit'
import template from './popup-add-chat.hbs'
import './popup-add-chat.scss'

export class PopupAddChat extends Block {
	constructor () {
		super({
			onSave: (e: SubmitEvent) => {
				e.preventDefault()
				const formData = getFormData(e.target as HTMLFormElement)
				const chatName = formData['chat-name'] as string
				chatsController.create(chatName)
			}
		})
	}

	protected render () {
		return this.compile(template, this.props)
	}
}
