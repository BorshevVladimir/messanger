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
import { ChatUser } from './partial/components/chat-user'
import { Form } from './partial/components/form'
import { FormFile } from './partial/components/form-file'
import { Span } from './partial/components/span'
import { AttachBlock } from './partial/components/attach-block'
import { SettingsOverlay } from './partial/components/settings-overlay'
import { PopupChatUsers } from './partial/components/popup-chat-users'
import { PopupAddUser } from './partial/components/popup-add-user'
import { PopupConfirmDelete } from './partial/components/popup-confirm-delete'

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
registerComponent('ChatUser', ChatUser)
registerComponent('Form', Form)
registerComponent('FormFile', FormFile)
registerComponent('Span', Span)
registerComponent('AttachBlock', AttachBlock)
registerComponent('SettingsOverlay', SettingsOverlay)
registerComponent('PopupChatUsers', PopupChatUsers)
registerComponent('PopupAddUser', PopupAddUser)
registerComponent('PopupConfirmDelete', PopupConfirmDelete)

router
	.use('/', LoginPage)
	.use('/sign-up', RegistrationPage)
	.use('/settings', ProfileSettingsPage)
	.use('/messenger', ChatPage)
	.use('/change-password', ProfileChangePasswordPage)
	.use('/404', Error404Page)
	.use('/500', Error500Page)
	.use('/500', Error500Page)
	.start()
