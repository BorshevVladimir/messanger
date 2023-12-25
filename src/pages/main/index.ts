import { Block } from '../../utils/Block'
import template from './main.hbs'
import { ROUTES, renderDOM } from '../../utils/renderDOM'
import './main.scss'

const pages: { title: string; to: keyof typeof ROUTES }[] = [
	{ to: 'error404', title: 'Ошибка 404',},
	{ to: 'error500', title: 'Ошибка 500' },
	{ to: 'login', title: 'Авторизация' },
	{ to: 'registration', title: 'Регистрация' },
	{ to: 'profileSettings', title: 'Профиль пользователя' },
	{ to: 'proflieChangePassword', title: 'Смена пароля' },
	{ to: 'chat', title: 'Чат' },
]

const pageWithClickEvents = pages.map(page =>
{
	return {...page, onClick (e: MouseEvent) {
		e.preventDefault()
		renderDOM(page.to)
	}}
})

export class Main extends Block {
	constructor () {
		super({ pageWithClickEvents })
	}
	render () {
		return this.compile(template, this.props)
	}
}
