import { Block } from './Block'

export function renderDOM (rootId: string, page: Block) {
	const root = document.getElementById(rootId)
	if (!root) {
		throw new Error('Отсутствует корневой компонент')
	}

	root.innerHTML = ''

	root.append(page.getContent()!)

	page.dispatchComponentDidMount()
}
