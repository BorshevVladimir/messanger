import { Block } from '../../../utils/Block'
import template from './span.hbs'

export class Span extends Block {
	render () {
		return this.compile(template, this.props)
	}
}
