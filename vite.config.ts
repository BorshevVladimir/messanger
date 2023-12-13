import { defineConfig, type Plugin } from 'vite'
import { resolve } from 'path'
import handlebars from 'vite-plugin-handlebars'
import { vitePluginHandlebarsPrecompile } from './vite-plugin-handlebars-precompile'

const pages: { title: string; name: string }[] = [
	{
		name: '404',
		title: 'Ошибка 404',
	},
	{ name: '500', title: 'Ошибка 500' },
	{ name: 'login', title: 'Авторизация' },
	{ name: 'registration', title: 'Регистрация' },
	{ name: 'profile-settings', title: 'Профиль пользователя' },
	{ name: 'profile-change-password', title: 'Смена пароля' },
	{ name: 'chat', title: 'Чат' },
]

const pagesWithUrls = pages.map((page) => {
	const { name } = page
	const path = name === 'index' ? name : `src/pages/${name}/${name}`

	return {
		...page,
		url: `${path}.html`,
	}
})

const pagePaths = Object.values(pagesWithUrls).reduce((paths, page) => {
	paths[page.name] = resolve(__dirname, page.url)
	return paths
}, {})

export default defineConfig({
	plugins: [
		handlebars({
			partialDirectory: resolve(__dirname, 'src/partial'),
			context: { pages: pagesWithUrls },
		}) as unknown as Plugin,
		vitePluginHandlebarsPrecompile(),
	],

	build: {
		rollupOptions: {
			input: {
				index: resolve(__dirname, 'index.html'),
				...pagePaths,
			},
		},
	},
})
