import { isPlainObject, type Indexed } from './isObject'

function set (
	object: Indexed | unknown,
	path: string,
	value: unknown
): Indexed | unknown {
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
