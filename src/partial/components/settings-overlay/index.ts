import { Block } from '../../../utils/Block'
import { renderDOM } from '../../../utils/renderDOM'
import template from './settings-overlay.hbs'
import './settings-overlay.scss'

type SettingsOverlayProps = {
	username: string
	imgSrc: string,
	closeOverlayHandle: () => void
}

export class SettingsOverlay extends Block {
	constructor (props: SettingsOverlayProps) {
		super({
			...props,
			closeOverlayHandle: props.closeOverlayHandle,
			changeUserDataHandle: () => {
				renderDOM('profileSettings')
			},
			changeUserPasswordHandle: () => {
				renderDOM('proflieChangePassword')
			},
			changeExitHandle: () => {
				renderDOM('login')
			}
		})
	}

	render () {
		return this.compile(template, this.props)
	}
}
