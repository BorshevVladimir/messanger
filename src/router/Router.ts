import { Route } from './Route.ts'
import { type BlockConstructable } from '../utils/Block.ts'

class Router {
	private static __instance?: Router
	public routes: Route[] = []
	public history = window.history
	private _currentRoute: Route | null = null
	private _notFoundRoute: Route | null = null
	private _rootQuery: string

	constructor (rootQuery: string) {
		if (Router.__instance) {
			return Router.__instance
		}

		this._rootQuery = rootQuery
		Router.__instance = this
	}

	use (pathname: string, block: BlockConstructable) {
		const route = new Route(pathname, block, { rootQuery: this._rootQuery })
		this.routes.push(route)
		return this
	}

	useNotFound (block: BlockConstructable) {
		this._notFoundRoute = new Route('', block, { rootQuery: this._rootQuery })
		return this
	}

	start () {
		window.addEventListener('popstate', (e) => {
			const path = (e.currentTarget as Window).location.pathname
			this._onRoute(path)
		})

		this._onRoute(window.location.pathname)
	}

	private _onRoute (pathname: string) {
		const route = this._getRoute(pathname) || this._notFoundRoute
		if (!route) {
			throw new Error(`Для маршрута не найден ${pathname} подходящий элемент`)
		}
		this._currentRoute?.leave()

		this._currentRoute = route
		route.render()
	}

	go (pathname: string) {
		this.history.pushState({}, '', pathname)
		this._onRoute(pathname)
	}

	back () {
		this.history.back()
	}

	forward () {
		this.history.forward()
	}

	private _getRoute (pathname: string) {
		return this.routes.find((route) => route.match(pathname))
	}

	public reset () {
		delete Router.__instance
		new Router(this._rootQuery)
	}
}

const router = new Router('app')
export { router }
