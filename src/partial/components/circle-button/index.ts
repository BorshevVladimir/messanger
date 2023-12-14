import { Block } from '../../../utils/Block'
import template from './circle-button.hbs'
import './circle-button.scss'

type CircleButtonProps = {
	onClick: () => void
}

export class CircleButton extends Block {
	constructor (props: CircleButtonProps) {
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
