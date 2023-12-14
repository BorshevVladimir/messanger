import { Block } from '../../../utils/Block'
import template from './popup-confirm-delete.hbs'
import './popup-confirm-delete.scss'

export class PopupConfirmDelete extends Block {
	render () {
		return this.compile(template, this.props)
	}
}
