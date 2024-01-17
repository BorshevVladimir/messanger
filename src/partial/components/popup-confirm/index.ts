import { Block } from '../../../utils/Block'
import template from './popup-confirm.hbs'
import './popup-confirm.scss'

type PopupConfirmProps = {
	onConfirm?: () => void
	onCancel?: () => void
}

export class PopupConfirm extends Block {
	constructor (props: PopupConfirmProps) {
		super(props)
	}
	render () {
		return this.compile(template, this.props)
	}
}
