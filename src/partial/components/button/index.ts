import { Block } from '../../../utils/Block'
import template from './button.hbs'
import './button.scss'

type ButtonProps = {
	type: 'submit' | 'button'
	onClick: () => void
}

export class Button extends Block {
	constructor (props: ButtonProps) {
		super({
			...props,
			events: {
				click: props.onClick,
			},
		})
	}

	render () {
		return this.compile(template, this.props)
	}
}
