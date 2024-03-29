import { EventBus } from '../utils/EventBus'
import { set } from '../utils/set'
import type { Block } from '../utils/Block'
import { deepEqual } from '../utils/deepEqual'
import type { User, ChatInfo, Message, ChatUser } from '../typings'

export enum StoreEvents {
	Updated = 'updated',
}

type State = {
	user?: User,
	chats?: ChatInfo[],
	selectedChat?: ChatInfo['id'] | undefined,
	messages?: Record<ChatInfo['id'], Message[]>
	chatUsers?: ChatUser[],
	chatsFilter?: string
}

export function withStore<SP extends Record<string, any>> (mapStateToProps: (state: State) => SP) {
	return function connect<P extends Record<string, any>> (Component: typeof Block<SP | P>) {
		return class extends Component {
			constructor (props: P) {

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
