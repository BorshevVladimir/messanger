import { Block } from '../../../utils/Block'
import template from './error-page-content.hbs'
import './error-page-content.scss'
import { router } from '../../../router/Router'

type ErrorPageContentProps = {
	title: string,
	description: string,
	'link-text': string
}

export class ErrorPageContent extends Block {
	constructor (props: ErrorPageContentProps) {
		super({
			...props,
			goToChatPage (e: MouseEvent) {
				e.preventDefault()
				router.go('/messenger')
			},
		})
	}

	render () {
		return this.compile(template, this.props)
	}
}
