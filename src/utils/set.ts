import { isPlainObject, type PlainObject } from './isObject'

function set (
	object: PlainObject | unknown,
	path: string,
	value: unknown
): PlainObject | unknown {
	if (!isPlainObject(object)) {
		return object
	}

	const keys = path.split('.')
	const res = keys.reduceRight((acc, current) => {
		return { [current]: acc }
	}, value)

	return Object.assign(object, res)
}

export { set }
