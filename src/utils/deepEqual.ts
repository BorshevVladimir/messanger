/** Глубокое сравнение 2 объектов
 * @param {object} a - Первый объект для сравнения
 * @param {object} b - Второй объект для сравнения
 */
export function deepEqual (a: any, b: any): boolean {
	if (a === b) {
		return true
	}

	if (
		typeof a === 'object' &&
		a !== null &&
		typeof b === 'object' &&
		b !== null
	) {
		if (Object.keys(a).length !== Object.keys(b).length) {
			return false
		}

		for (const prop in a) {
			if (Object.prototype.hasOwnProperty.call(b, prop) ) {
				if (!deepEqual(a[prop], b[prop])) {
					return false
				}
			} else return false
		}

		return true
	} else return false
}
