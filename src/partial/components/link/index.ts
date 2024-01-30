import { Block } from '../../../utils/Block.ts'
import template from './link.hbs'
import './link.scss'

type LinkProps = {
	error?: boolean
	href: string
	onClick?: () => void
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
