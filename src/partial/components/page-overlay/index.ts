import { Block } from '../../../utils/Block'
import template from './page-overlay.hbs'
import './page-overlay.scss'

export class PageOverlay extends Block {
	render () {
		return this.compile(template, this.props)
	}
}
