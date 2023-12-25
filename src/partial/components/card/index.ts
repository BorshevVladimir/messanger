import { Block } from '../../../utils/Block'
import template from './card.hbs'
import './card.scss'

type CardProps = {
	title?: string
}

export class Card extends Block {
	constructor (props: CardProps) {
		super(props)
	}

	render () {
		return this.compile(template, this.props)
	}
}
