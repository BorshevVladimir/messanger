type OptionsData = Record<string, unknown>

type Options = {
	method: METHODS
	data?: OptionsData
	headers?: Record<string, string>
	timeout?: number
}

type OptionsWithoutMethod = Omit<Options, 'method'>

const enum METHODS {
	GET = 'GET',
	PUT = 'PUT',
	POST = 'POST',
	DELETE = 'DELETE',
}

function queryStringify (data: OptionsData) {
	const params = Object.entries(data).map(([key, value]) => `${key}=${value}`)
	return `?${params.join('&')}`
}

function request (
	url: string,
	options: Options = { method: METHODS.GET },
	timeout = 5000
): Promise<XMLHttpRequest> {
	const { method, data = {}, headers = {} } = options

	const isGet = method === METHODS.GET

	return new Promise((resolve, reject) => {
		const xhr = new XMLHttpRequest()

		if (headers) {
			Object.entries(headers).forEach(([header, value]) =>
				xhr.setRequestHeader(header, value)
			)
		}

		xhr.timeout = timeout

		xhr.open(method, isGet && !!data ? `${url}${queryStringify(data)}` : url)
		xhr.onload = () => resolve(xhr)
		xhr.onabort = reject
		xhr.onerror = reject
		xhr.ontimeout = reject

		if (method === METHODS.GET || !data) {
			xhr.send()
		} else {
			xhr.send(JSON.stringify(data))
		}
	})
}

export class HTTPTransport {
	get = (url: string, options: OptionsWithoutMethod) => {
		return request(url, { ...options, method: METHODS.GET }, options.timeout)
	}

	put = (url: string, options: OptionsWithoutMethod) => {
		return request(url, { ...options, method: METHODS.PUT }, options.timeout)
	}

	post = (url: string, options: OptionsWithoutMethod) => {
		return request(url, { ...options, method: METHODS.POST }, options.timeout)
	}

	delete = (url: string, options: OptionsWithoutMethod) => {
		return request(url, { ...options, method: METHODS.DELETE }, options.timeout)
	}
}
