import { Block } from '../../../utils/Block'
import template from './popup-add-chat.hbs'
import './popup-add-chat.scss'

export class PopupAddChat extends Block {
	protected render () {
		return this.compile(template, this.props)
	}
}
