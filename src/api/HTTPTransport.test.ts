import { expect } from 'chai'
import { HTTPTransport } from './HTTPTransport.ts'
import sinon, {
	SinonFakeXMLHttpRequest,
	SinonFakeXMLHttpRequestStatic,
} from 'sinon'

describe('HTTPTransport', () => {
	let xhr: SinonFakeXMLHttpRequestStatic
	let instance: HTTPTransport
	let requests: SinonFakeXMLHttpRequest[] = []

	beforeEach(() => {
		xhr = sinon.useFakeXMLHttpRequest()

		global.XMLHttpRequest = xhr as any

		instance = new HTTPTransport('/auth')

		xhr.onCreate = (request: SinonFakeXMLHttpRequest) => {
			requests.push(request)
		}
	})

	afterEach(() => {
		requests = []
	})

	it('.get() should send GET Request', () => {
		instance.get('/user')
		const [request] = requests
		expect(request.method).to.eq('GET')
	})

	it('.post() should send POST Request', () => {
		instance.post('/user')
		const [request] = requests
		expect(request.method).to.eq('POST')
	})

	it('.put() should send PUT Request', () => {
		instance.put('/user')
		const [request] = requests
		expect(request.method).to.eq('PUT')
	})

	it('.delete() should send DELETE Request', () => {
		instance.delete('/user')
		const [request] = requests
		expect(request.method).to.eq('DELETE')
	})
})
