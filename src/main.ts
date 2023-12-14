import { renderDOM } from './utils/renderDOM'
import { registerComponent } from './utils/registerComponent'

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

renderDOM('main')
