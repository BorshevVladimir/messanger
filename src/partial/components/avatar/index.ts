import { Block } from '../../../utils/Block'
import template from './avatar.hbs'
import './avatar.scss'

type AvatarProps = {
	big?: boolean
	src: string
	alt: string
}

export class Avatar extends Block {
	constructor (props: AvatarProps) {
		super(props)
	}

	render () {
		return this.compile(template, this.props)
	}
}
