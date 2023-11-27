import { defineConfig, type Plugin } from "vite"
import { resolve } from "path"
import handlebars from "vite-plugin-handlebars"

const pages = [
	"index",
	"404",
	"500",
	"login",
	"registration",
	"profile-settings",
	"profile-change-password",
	"chat",
]

export default defineConfig({
	plugins: [
		handlebars({
			partialDirectory: resolve(__dirname, "src/partial"),
		}) as unknown as Plugin,
	],

	build: {
		rollupOptions: {
			input: pages.reduce((paths, page) => {
				const file = page === "index" ? page : `src/pages/${page}/${page}`
				paths[page] = resolve(__dirname, `${file}.html`)
				return paths
			}, {}),
		},
	},
})
