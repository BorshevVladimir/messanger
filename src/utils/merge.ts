import { type Indexed } from './isObject'

export function merge (lhs: Indexed, rhs: Indexed): Indexed {
	for (const prop in rhs) {
		if (!Object.prototype.hasOwnProperty.call(rhs, prop)) {
			continue
		}

		try {
			if ((rhs[prop] as Indexed).constructor === Object) {
				rhs[prop] = merge(lhs[prop] as Indexed, rhs[prop] as Indexed)
			} else {
				lhs[prop] = rhs[prop]
			}
		} catch (e) {
			lhs[prop] = rhs[prop]
		}
	}

	return lhs
}
