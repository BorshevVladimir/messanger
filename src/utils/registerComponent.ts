import { Block } from './Block'
import Handlebars, { type HelperOptions } from 'handlebars'

export function registerComponent <TComponent extends new (hash: any) => Block> (name: string, Component: TComponent) {
	if (name in Handlebars.helpers) {
		throw new Error(`Компонент ${name} уже зарегистрирован`)
	}

	Handlebars.registerHelper(
		name,
		function (this: unknown, { hash, data, fn }: HelperOptions) {
			const component = new Component(hash)

			if ('ref' in hash) {
				(data.root.__refs = data.root.__refs || {})[hash.ref] = component
			}

			const dataAttribute = `data-id="${component.id}"`
			;(data.root.__children = data.root.__children || []).push({
				component,
				embed (fragment: DocumentFragment) {
					const stub = fragment.querySelector(`[${dataAttribute}]`)

					if (!stub) {
						return
					}

					component.getContent()?.append(...Array.from(stub.childNodes))

					stub.replaceWith(component.getContent()!)
				},
			})

			// Если в приходит fn - это блочный хелпер
			const contents = fn ? fn(this) : ''
			return `<div ${dataAttribute}>${contents}</div>`
		}
	)
}
