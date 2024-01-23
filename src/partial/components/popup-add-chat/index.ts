import { chatsController } from '../../../controllers/ChatsController'
import { Block } from '../../../utils/Block'
import template from './popup-add-chat.hbs'
import type { FormTextField, FormErrorDescription } from '../../../typings'
import { InputValidator } from '../../../utils/InputValidator'
import './popup-add-chat.scss'
import { Indexed } from '../../../utils/isObject'

const formInputs: Record<string, FormTextField> = {
	chat_name: {
		label: 'Название чата',
		placeholder: 'Введите название чата',
		error: 'Название не может быть пустым',
		type: 'text',
		validator: InputValidator.validateNotEmpty,
	}
}

export class PopupAddChat extends Block {
	constructor () {
		super({
			formInputs,
			onFormSubmit: (data: { formValues: Indexed, errors: FormErrorDescription[] }) => {
				if (data.errors.length === 0) {
					chatsController.create(data.formValues['chat_name'] as string)
				}
			}
		})
	}

	protected render () {
		return this.compile(template, this.props)
	}
}
