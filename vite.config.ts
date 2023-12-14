import { defineConfig, type Plugin } from 'vite'
import { resolve } from 'path'
import handlebars from 'vite-plugin-handlebars'
import { vitePluginHandlebarsPrecompile } from './vite-plugin-handlebars-precompile'

export default defineConfig({
	plugins: [
		handlebars({
			partialDirectory: resolve(__dirname, 'src/partial'),
		}) as unknown as Plugin,
		vitePluginHandlebarsPrecompile(),
	],

	build: {
		rollupOptions: {
			input: {
				index: resolve(__dirname, 'index.html'),
			},
		},
	},
})
