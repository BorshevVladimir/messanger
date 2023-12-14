import { Block } from '../../../utils/Block'
import template from './attach-block.hbs'
import './attach-block.scss'

export class AttachBlock extends Block {
	render () {
		return this.compile(template, this.props)
	}
}
