import { EventBus } from './EventBus'

export enum WSTransportEvents {
	Connected = 'connected',
	Error = 'error',
	Message ='message',
	Close = 'close'
}

export class WSTransport extends EventBus {
	private _socket: WebSocket | null = null
	private _pingInterval: number = 0

	constructor (private _url: string) {
		super()
	}

	public connect (): Promise<void> {
		this._socket = new WebSocket(this._url)
		this._subscribe()

		this._setupPing()

		return new Promise(resolve => {
			this.on(WSTransportEvents.Connected, () => resolve())
		})
	}

	public close () {
		this._socket?.close()
	}

	public send (data: unknown) {
		if(!this._socket) {
			throw new Error('Socket is not connected')
		}

		this._socket.send(JSON.stringify(data))
	}

	private _subscribe () {
		this._socket?.addEventListener('open', () => {
			this.emit(WSTransportEvents.Connected)
		})

		this._socket?.addEventListener('close', () => {
			this.emit(WSTransportEvents.Close)
		})

		this._socket?.addEventListener('error', (e: Event) => {
			this.emit(WSTransportEvents.Error, e)
		})

		this._socket?.addEventListener('message', (message) => {
			const data = JSON.parse(message.data)

			if (['user connected', 'pong'].includes(data?.type)) {
				return
			}

			this.emit(WSTransportEvents.Message, data)
		})
	}

	private _setupPing () {
		this._pingInterval = window.setInterval(() => {
			this.send({ type: 'ping' })
		}, 5000)

		this.on(WSTransportEvents.Close, () => {
			clearInterval(this._pingInterval)

			this._pingInterval = 0
		})
	}
}
