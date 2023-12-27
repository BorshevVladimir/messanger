import { Block } from '../utils/Block'
import { deepEqual } from '../utils/deepEqual'
import { renderDOM } from '../utils/renderDOM'

type Pathname = string
type BlockConstructor = new () => Block
type RouteProps = {
	rootQuery: string
	[key: string]: unknown
}

export class Route {
	private _pathname: Pathname
	private _blockClass: BlockConstructor
	private _block: Block | null
	private _props: RouteProps

	constructor (pathname: Pathname, view: BlockConstructor, props: RouteProps) {
		this._pathname = pathname
		this._blockClass = view
		this._block = null
		this._props = props
	}

	navigate (pathname: Pathname) {
		if (this.match(pathname)) {
			this._pathname = pathname
			this.render()
		}
	}

	leave () {
		this._block = null
	}

	match (pathname: Pathname) {
		return deepEqual(pathname, this._pathname)
	}

	render () {
		if (!this._block) {
			this._block = new this._blockClass()
			renderDOM(this._props.rootQuery, this._block)
			return
		}
	}
}
