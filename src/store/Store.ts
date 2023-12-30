import { EventBus } from '../utils/EventBus'
import { set } from '../utils/set'
import type { PlainObject } from '../utils/isObject'

export enum StoreEvents {
	Updated = 'updated',
}

class Store extends EventBus {
	private state: PlainObject = {}

	public getState () {
		return this.state
	}

	public set (path: string, value: unknown) {
		set(this.state, path, value)
		this.emit(StoreEvents.Updated)
	}
}

const store = new Store()
export { store }
