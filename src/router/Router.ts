import { Route } from './Route'
import { Block } from '../utils/Block'

class Router {
	private static __instance: Router
	public routes: Route[] = []
	public history = window.history
	private _currentRoute: Route | null = null
	private _rootQuery: string

	constructor (rootQuery: string) {
		if (Router.__instance) {
			return Router.__instance
		}

		this._rootQuery = rootQuery
		Router.__instance = this
	}

	use (pathname: string, block: new () => Block) {
		const route = new Route(pathname, block, { rootQuery: this._rootQuery })
		this.routes.push(route)
		return this
	}

	start () {
		window.addEventListener('popstate', (e) => {
			const path = (e.currentTarget as Window).location.pathname
			this._onRoute(path)
		})

		this._onRoute(window.location.pathname)
	}

	_onRoute (pathname: string) {
		const route = this.getRoute(pathname)
		if (!route) {
			return
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

	getRoute (pathname: string) {
		return this.routes.find((route) => route.match(pathname))
	}
}

const router = new Router('app')
export { router }
