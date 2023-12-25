import { Block } from '../../../utils/Block'
import template from './error-page-content.hbs'
import './error-page-content.scss'

export class ErrorPageContent extends Block {
	render () {
		return this.compile(template, this.props)
	}
}
