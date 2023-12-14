type EventName = string

type Listener = (...args: any[]) => void

interface IEventBus {
	on: (event: EventName, callback: Listener) => void
	off: (event: EventName, callback: Listener) => void
	emit: (event: EventName, ...args: unknown[]) => void
}

export class EventBus implements IEventBus {
	private _listeners: Record<string, Listener[]>

	constructor () {
		this._listeners = {}
	}

	on (event: EventName, callback: Listener): void {
		if (!this._listeners[event]) {
			this._listeners[event] = []
		}

		this._listeners[event].push(callback)
	}

	off (event: EventName, callback: Listener) {
		if (!this._listeners[event]) {
			throw new Error(`Нет события: ${event}`)
		}

		this._listeners[event] = this._listeners[event].filter(
			(listener) => listener !== callback
		)
	}

	emit (event: EventName, ...args: unknown[]) {
		if (!this._listeners[event]) {
			throw new Error(`Нет события: ${event}`)
		}

		this._listeners[event].forEach((listener) => {
			listener(...args)
		})
	}
}
