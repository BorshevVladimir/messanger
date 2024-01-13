import { Block } from '../../../utils/Block'
import template from './settings-overlay.hbs'
import { router } from '../../../router/Router'
import './settings-overlay.scss'
import { authController } from '../../../controllers/AuthController'
import { withStore } from '../../../store/Store'

type SettingsOverlayProps = {
	username: string
	imgSrc: string,
	closeOverlayHandle: () => void
}

export class SettingsOverlayBase extends Block {
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

const withUser = withStore((state) => ({
	// FIXME: с бека поле display_name приходит null
	username: `${ state.user?.first_name } ${ state.user?.second_name }`,
	imgSrc: `https://ya-praktikum.tech/api/v2/resources${state.user?.avatar}`
}))

export const SettingsOverlay = withUser(SettingsOverlayBase)
