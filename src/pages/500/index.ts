import { Block } from '../../utils/Block'
import template from './500.hbs'
import './500.scss'

export class Error500Page extends Block {
	render () {
		return this.compile(template, this.props)
	}
}
