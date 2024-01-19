import { Block } from '../../../utils/Block'
import template from './input.hbs'
import './input.scss'

type InputProps = {
	onBlur: () => void
	onChange: () => void
	name: string
	value: unknown
	accept?: string
	events: {
		blur: () => void
	}
}

export class Input extends Block {
	constructor (props: InputProps) {
		super({
			...props,
			events: {
				blur: props.onBlur,
				change: props.onChange
			},
		})
	}

	setValue (value: string) {
		(this.element as HTMLInputElement).value = value
	}

	getValue () {
		return (this.element as HTMLInputElement).value
	}

	clear () {
		(this.element as HTMLInputElement).value = ''
	}

	render () {
		return this.compile(template, this.props)
	}
}
