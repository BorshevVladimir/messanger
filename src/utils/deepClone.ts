/** Функция для глубоко копирования объектов
 * @param {object} obj - объект для копирования
 */
export function deepClone<T extends object> (obj: T): T {
	return JSON.parse(JSON.stringify(obj))
}
