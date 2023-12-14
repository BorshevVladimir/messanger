import { Block } from '../../../utils/Block'
import template from './form.hbs'
import './form.scss'

type FormProps = {
	onSubmit: () => void
	onFocusout: () => void
	events: {
		submit: () => void
		focusout: () => void
	}
}

export class Form extends Block {
	constructor (props: FormProps) {
		super({
			...props,
			events: {
				submit: props.onSubmit,
				focusout: props.onFocusout
			}
		})
	}

	render () {
		return this.compile(template, this.props)
	}
}
