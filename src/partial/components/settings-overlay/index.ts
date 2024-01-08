import { Block } from '../../../utils/Block'
import template from './settings-overlay.hbs'
import { router } from '../../../router/Router'
import './settings-overlay.scss'
import { authController } from '../../../controllers/AuthController'

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
				router.go('/settings')
			},
			changeUserPasswordHandle: () => {
				router.go('/change-password')
			},
			logout: () => {
				authController.logout()
			}
		})
	}

	render () {
		return this.compile(template, this.props)
	}
}
