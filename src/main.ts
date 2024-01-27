import { registerComponent } from './utils/registerComponent'
import { router } from './router/Router'

import { Error404Page } from './pages/404'
import { Error500Page } from './pages/500'
import { LoginPage } from './pages/login'
import { RegistrationPage } from './pages/registration'
import { ChatPage } from './pages/chat'
import { ProfileSettingsPage } from './pages/profile-settings'
import { ProfileChangePasswordPage } from './pages/profile-change-password'

import { Button } from './partial/components/button'
import { Input } from './partial/components/input'
import { FormInput } from './partial/components/form-input'
import { Card } from './partial/components/card'
import { PageOverlay } from './partial/components/page-overlay'
import { Link } from './partial/components/link'
import { ErrorPageContent } from './partial/components/error-page-content'
import { CircleButton } from './partial/components/circle-button'
import { Badge } from './partial/components/badge'
import { Avatar } from './partial/components/avatar'
import { ChatCard } from './partial/components/chat-card'
import { Form } from './partial/components/form'
import { FormFile } from './partial/components/form-file'
import { Span } from './partial/components/span'
import { SettingsOverlay } from './partial/components/settings-overlay'
import { PopupAddChat } from './partial/components/popup-add-chat'
import { PopupAddUser } from './partial/components/popup-add-user'
import { PopupConfirm } from './partial/components/popup-confirm'
import { ChatMessenger } from './partial/components/chat-messenger'
import { UploadFile } from './partial/components/upload-file'
import { ChatMessage } from './partial/components/chat-message'
import { ComplexForm } from './partial/components/complex-form'
import { ChatUsers } from './partial/components/chat-users'
import { authController } from './controllers/AuthController'

registerComponent('Button', Button)
registerComponent('Input', Input)
registerComponent('FormInput', FormInput)
registerComponent('Card', Card)
registerComponent('PageOverlay', PageOverlay)
registerComponent('Link', Link)
registerComponent('ErrorPageContent', ErrorPageContent)
registerComponent('CircleButton', CircleButton)
registerComponent('Badge', Badge)
registerComponent('Avatar', Avatar)
registerComponent('ChatCard', ChatCard)
registerComponent('Form', Form)
registerComponent('FormFile', FormFile)
registerComponent('Span', Span)
registerComponent('SettingsOverlay', SettingsOverlay)
registerComponent('PopupAddChat', PopupAddChat)
registerComponent('PopupAddUser', PopupAddUser)
registerComponent('ChatMessenger', ChatMessenger)
registerComponent('PopupConfirm', PopupConfirm)
registerComponent('UploadFile', UploadFile)
registerComponent('ChatMessage', ChatMessage)
registerComponent('ComplexForm', ComplexForm)
registerComponent('ChatUsers', ChatUsers)

enum Routes {
	Index = '/',
	Register = '/sign-up',
	ProfileSettings = '/settings',
	Messenger = '/messenger',
	ChangePassword = '/change-password',
	Error404 = '/404',
	Error500 = '/500',
}

router
	.use(Routes.Index, LoginPage)
	.use(Routes.Register, RegistrationPage)
	.use(Routes.ProfileSettings, ProfileSettingsPage)
	.use(Routes.Messenger, ChatPage)
	.use(Routes.ChangePassword, ProfileChangePasswordPage)
	.use(Routes.Error500, Error500Page)
	.useNotFound(Error404Page)

window.addEventListener('DOMContentLoaded', async () => {
	let isProtectedRoute = true

	switch(window.location.pathname) {
		case Routes.Index:
		case Routes.Register:
			isProtectedRoute = false
			break
	}

	try {
		await authController.fetchUser()
		router.start()

		if (!isProtectedRoute) {
			router.go(Routes.Messenger)
		}
	} catch (err) {
		router.start()

		if(isProtectedRoute) {
			router.go(Routes.Index)
		}
	}
})
