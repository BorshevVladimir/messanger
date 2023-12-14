import { Block } from '../../../utils/Block'
import template from './popup-add-user.hbs'
import './popup-add-user.scss'

export class PopupAddUser extends Block {
	render () {
		return this.compile(template, this.props)
	}
}
