import { EventBus } from './EventBus'
import { deepEqual } from './deepEqual'
import { deepClone } from './deepClone'
import { type UniqueId, generateUniqueId } from './generateUniqueId'
import { TemplateDelegate } from 'handlebars'

type Children = Record<string, Block | Block[]>

export abstract class Block<Props extends Record<string, any> = any> {
	static EVENTS = {
		INIT: 'init',
		FLOW_CDM: 'flow:component-did-mount',
		FLOW_RENDER: 'flow:render',
		FLOW_CDU: 'flow:component-did-update'
	} as const

	protected props: Props
	private readonly _eventBus: EventBus

	public readonly id: UniqueId
	protected refs: Record<string, Block>

	public children: Children

	private _element: HTMLElement | null = null

	constructor (propsWithChildren: Props = {} as Props) {
		const { props, children } = this._getChildrenAndProps(propsWithChildren)
		this.children = children

		this.id = generateUniqueId()

		this.props = this._makePropsProxy(props)
		this._eventBus = new EventBus()

		this.refs = {}

		this._registerEvents()
		this._eventBus.emit(Block.EVENTS.INIT)
	}

	private _registerEvents () {
		this._eventBus.on(Block.EVENTS.INIT, this._init.bind(this))
		this._eventBus.on(Block.EVENTS.FLOW_CDM, this._componentDidMount.bind(this))
		this._eventBus.on(Block.EVENTS.FLOW_RENDER, this._render.bind(this))
		this._eventBus.on(
			Block.EVENTS.FLOW_CDU,
			this._componentDidUpdate.bind(this)
		)
	}

	private _init () {
		this.init()
		this._eventBus.emit(Block.EVENTS.FLOW_RENDER)
	}

	protected init () {}

	private _componentDidMount () {
		this.componentDidMount()

		Object.values(this.children).forEach((child) => {
			if (Array.isArray(child)) {
				child.forEach((ch) => ch.dispatchComponentDidMount())
			} else {
				child.dispatchComponentDidMount()
			}
		})

		this._eventBus.emit(Block.EVENTS.FLOW_RENDER)
	}

	protected componentDidMount () {}

	dispatchComponentDidMount () {
		this._eventBus.emit(Block.EVENTS.FLOW_CDM)
	}

	private _componentDidUpdate (oldProps: Props, newProps: Props) {
		const mustUpdate = this.componentDidUpdate(oldProps, newProps)
		if (mustUpdate) {
			this._eventBus.emit(Block.EVENTS.FLOW_RENDER)
		}
	}

	protected componentDidUpdate (oldProps: Props, newProps: Props): boolean {
		// console.log('check', !deepEqual(oldProps, newProps), this, oldProps, newProps)
		return !deepEqual(oldProps, newProps)
	}

	setProps = (nextProps: Props) => {
		if (!nextProps) {
			return
		}

		Object.assign(this.props, nextProps)
	}

	get element () {
		return this._element
	}

	private _getChildrenAndProps (propsWithChildren: Props) {
		const children: Children = {}
		const props = {} as Props

		Object.entries(propsWithChildren).forEach(([key, value]) => {
			if (
				value instanceof Block ||
				(Array.isArray(value) && value.every((elem) => elem instanceof Block))
			) {
				children[key] = value
			} else {
				props[key as keyof Props] = value
			}
		})

		return { children, props }
	}

	protected compile (template: TemplateDelegate<any>, context: any) {
		const contextAndStubs = { ...context } // Так как это прокси, копируем в новый объект

		const fragment = document.createElement('template')

		fragment.innerHTML = template(contextAndStubs)

		this.refs = contextAndStubs.__refs || {}

		contextAndStubs.__children?.forEach((child: { embed: (e: DocumentFragment)=> void }) =>
			child.embed(fragment.content)
		)

		return fragment.content
	}

	private _render () {
		const fragment = this.render()
		const newElement = fragment.firstElementChild as Element

		if (this._element) {
			this._element.replaceWith(newElement)
		}

		this._removeEvents()

		this._element = newElement as HTMLElement
		this._addEvents()
	}

	protected render (): DocumentFragment {
		return document.createDocumentFragment()
	}

	private _addEvents (): void {
		this.props.events
		const { events } = this.props
		if (!events) {
			return
		}

		Object.keys(events).forEach((eventName) => {
			this._element?.addEventListener(eventName, events[eventName])
		})
	}

	private _removeEvents (): void {
		const { events = {} } = this.props
		Object.keys(events).forEach((eventName) => {
			this._element?.removeEventListener(eventName, events[eventName])
		})
	}

	getContent () {
		return this.element
	}

	private _makePropsProxy (props: Props) {
		const self = this
		return new Proxy(props, {
			get (target, prop) {
				const value = target[prop as string]
				return typeof value === 'function' ? value.bind(target) : value
			},
			set (target, prop, value) {
				const oldTarget = deepClone(target)
				target[prop as keyof Props] = value

				self._eventBus.emit(Block.EVENTS.FLOW_CDU, oldTarget, target)
				return true
			},
			deleteProperty () {
				throw new Error('нет доступа')
			},
		})
	}

	show () {
		this.getContent()!.style.display = 'block'
	}

	hide () {
		this.getContent()!.style.display = 'none'
	}
	// FIXME: Попробовать избавиться от этого метода. Такой метод по логике должен быть у конкретных компонентов
	showToggle () {
		if (this.getContent()!.style.display === 'block') {
			this.getContent()!.style.display = 'none'
		} else {
			this.getContent()!.style.display = 'block'
		}
	}
}
