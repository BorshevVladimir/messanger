import { Block } from '../../../utils/Block'
import template from './form-file.hbs'
import './form-file.scss'

type FormFileProps = {
	name?: string
	accept?: string
}

export class FormFile extends Block {
	constructor (props: FormFileProps) {
		super(props)
	}

	render () {
		return this.compile(template, this.props)
	}
}
