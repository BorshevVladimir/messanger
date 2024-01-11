import { EventBus } from '../utils/EventBus'
import { set } from '../utils/set'
import type { Indexed } from '../utils/isObject'
import type { Block } from '../utils/Block'
import { deepEqual } from '../utils/deepEqual'
import type { User } from '../typings'

export enum StoreEvents {
	Updated = 'updated',
}

type State = {
	user?: User
}

export function withStore (mapStateToProps: (state: State) => Indexed) {
	return function connect (Component: typeof Block) {
		return class extends Component {
			constructor (props: Indexed) {

				let prevState = mapStateToProps(store.getState())
				super({ ...props, ...prevState })

				store.on(StoreEvents.Updated, () => {
					const newState = mapStateToProps(store.getState())

					if (!deepEqual(prevState, newState)) {
						this.setProps({ ...newState })
					}

					prevState = newState
				})
			}
		}
	}
}

class Store extends EventBus {
	private state: State = {}

	public getState () {
		return this.state
	}

	public set (path: string, value: unknown) {
		set(this.state, path, value)
		this.emit(StoreEvents.Updated, this.getState())
	}
}

const store = new Store()
export { store }
