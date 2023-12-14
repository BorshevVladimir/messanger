import { Block } from '../../../utils/Block'
import template from './link.hbs'
import './link.scss'

type LinkProps = {
	onClick: () => void
	events: {
		click: () => void
	}
}

export class Link extends Block {
	constructor (props: LinkProps) {
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
