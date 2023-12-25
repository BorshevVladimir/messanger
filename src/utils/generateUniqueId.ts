export type UniqueId = string

/** Генерация уникального идентификатора
 * @param {number} [length=6] - длина итогового идентификатора
 */
export function generateUniqueId (length = 6): UniqueId {
	return Math.random()
		.toString(36)
		.substring(2, length + 2)
}
