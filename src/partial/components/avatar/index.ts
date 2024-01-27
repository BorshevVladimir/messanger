import { Block } from '../../../utils/Block'
import template from './avatar.hbs'
import './avatar.scss'

type AvatarProps = {
	big?: boolean
	src: string
	alt: string
}

const placeholderPath = 'no-image.svg'

export class Avatar extends Block {
	constructor (props: AvatarProps) {
		super({
			...props,
			src: props.src ? `https://ya-praktikum.tech/api/v2/resources${props.src}` : placeholderPath
		})
	}

	render () {
		return this.compile(template, this.props)
	}
}
