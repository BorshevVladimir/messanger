import { Block } from '../../../utils/Block'
import template from './input.hbs'
import './input.scss'

type InputProps = {
	onBlur: () => void
	value: unknown
	events: {
		blur: () => void
	}
}

export class Input extends Block {
	constructor (props: InputProps) {
		super({
			...props,
			events: {
				blur: props.onBlur
			},
		})
	}

	render () {
		return this.compile(template, this.props)
	}
}
