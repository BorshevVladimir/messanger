import { Block } from '../../../utils/Block'
import template from './badge.hbs'
import './badge.scss'

type BadgeProps = {
	text?: string
}

export class Badge extends Block {
	constructor (props: BadgeProps) {
		super(props)
	}

	render () {
		return this.compile(template, this.props)
	}
}
