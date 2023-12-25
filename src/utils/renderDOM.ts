import { Main } from '../pages/main'
import { LoginPage } from '../pages/login'
import { Error500Page } from '../pages/500'
import { Error404Page } from '../pages/404'
import { ChatPage } from '../pages/chat'
import { RegistrationPage } from '../pages/registration'
import { ProfileSettingsPage } from '../pages/profile-settings'
import { ProfileChangePasswordPage } from '../pages/profile-change-password'

export const ROUTES = {
	main: Main,
	login: LoginPage,
	error500: Error500Page,
	error404: Error404Page,
	chat: ChatPage,
	registration: RegistrationPage,
	profileSettings: ProfileSettingsPage,
	proflieChangePassword: ProfileChangePasswordPage
}

export function renderDOM (name: keyof typeof ROUTES) {
	const root = document.getElementById('app')
	if (!root) {
		throw new Error('Отсутствует корневой компонент')
	}

	const Page = ROUTES[name]
	const page = new Page()

	root.innerHTML = ''

	root.append(page.getContent()!)

	page.dispatchComponentDidMount()
}
