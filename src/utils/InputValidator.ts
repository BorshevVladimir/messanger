export abstract class InputValidator {
	/** Валидация имени и фамилии
	 * @param {string} value - входная строка для поиска
	 * @description Латиница или кириллица, первая буква должна быть заглавной, без пробелов и без цифр, нет спецсимволов (допустим только дефис)
	 */
	static validateName (value: string): boolean {
		return /^[А-ЯЁA-Z][а-яёa-z-]+$/.test(value)
	}

	/** Валидация логина
	 * @param {string} value - входная строка для поиска
	 * @description От 3 до 20 символов, латиница, может содержать цифры, но не состоять из них, без пробелов, без спецсимволов (допустимы дефис и нижнее подчёркивание)
	 */
	static validateLogin (value: string): boolean {
		return /^(?=.*[a-zA-Z])[a-zA-Z0-9]{3,20}$/.test(value)
	}

	/** Валидация email
	 * @param {string} value - входная строка для поиска
	 * @description Латиница, может включать цифры и спецсимволы вроде дефиса и подчёркивания, обязательно должна быть «собака» (@) и точка после неё, но перед точкой обязательно должны быть буквы
	 */
	static validateEmail (value: string): boolean {
		return /^[\w-]+@[A-Za-z]+.[A-Za-z]+$/.test(value)
	}

	/** Валидация пароля
	 * @param {string} value - входная строка для поиска
	 * @description От 8 до 40 символов, обязательно хотя бы одна заглавная буква и цифра
	 */
	static validatePassword (value: string): boolean {
		return /^(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{8,40}$/.test(value)
	}

	/** Валидация телефона
	 * @param {string} value - входная строка для поиска
	 * @description От 10 до 15 символов, состоит из цифр, может начинается с плюса
	 */
	static validatePhone (value: string): boolean {
		return /^\+?\d{10,15}$/.test(value)
	}

	/** Валидация поля ввода сообщения
	 * @param {string} value - входная строка для поиска
	 * @description Не должно быть пустым
	 */
	static validateMessage (value: string): boolean {
		return value.trim().length !== 0
	}
}
