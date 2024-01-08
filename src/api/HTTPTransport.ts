type OptionsData = Record<string, unknown>

type Options = {
	method: Method
	data?: OptionsData
	headers?: Record<string, string>
	timeout?: number
}

type OptionsWithoutMethod = Omit<Options, 'method'>

const enum Method {
	GET = 'GET',
	PUT = 'PUT',
	POST = 'POST',
	DELETE = 'DELETE',
}

function queryStringify (data: OptionsData) {
	const params = Object.entries(data).map(([key, value]) => `${key}=${value}`)
	return `?${params.join('&')}`
}

function request<TResponse> (
	url: string,
	options: Options = { method: Method.GET },
	timeout = 5000
): Promise<TResponse> {
	const { method, data = {}, headers = {} } = options

	const isGet = method === Method.GET

	return new Promise((resolve, reject) => {
		const xhr = new XMLHttpRequest()

		if (headers) {
			Object.entries(headers).forEach(([header, value]) =>
				xhr.setRequestHeader(header, value)
			)
		}

		xhr.timeout = timeout

		xhr.open(method, isGet && !!data ? `${url}${queryStringify(data)}` : url)

		xhr.onreadystatechange = () => {
			if (xhr.readyState === XMLHttpRequest.DONE) {
				if (xhr.status < 400) {
					resolve(xhr.response)
				} else {
					reject(xhr.response)
				}
			}
		}

		xhr.onabort = reject
		xhr.onerror = reject
		xhr.ontimeout = reject

		xhr.setRequestHeader('Content-Type', 'application/json')
		xhr.withCredentials = true
		xhr.responseType = 'json'

		if (method === Method.GET || !data) {
			xhr.send()
		} else {
			xhr.send(JSON.stringify(data))
		}
	})
}

type RequestFn = <TResponse = void>(
	url: string,
	options?: OptionsWithoutMethod
) => Promise<TResponse>

export class HTTPTransport {
	static BASE_URL = 'https://ya-praktikum.tech/api/v2'
	protected endpoint: string

	constructor (endpoint: string) {
		this.endpoint = `${HTTPTransport.BASE_URL}${endpoint}`
	}

	get: RequestFn = (url: string, options?: OptionsWithoutMethod) => {
		return request(
			this.endpoint + url,
			{ ...options, method: Method.GET },
			options?.timeout
		)
	}

	put: RequestFn = (url: string, options: OptionsWithoutMethod) => {
		return request(
			this.endpoint + url,
			{ ...options, method: Method.PUT },
			options.timeout
		)
	}

	post: RequestFn = (url: string, options?: OptionsWithoutMethod) => {
		return request(
			this.endpoint + url,
			{ ...options, method: Method.POST },
			options?.timeout
		)
	}

	delete: RequestFn = (url: string, options: OptionsWithoutMethod) => {
		return request(
			this.endpoint + url,
			{ ...options, method: Method.DELETE },
			options.timeout
		)
	}
}
