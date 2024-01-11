import type {  FormTextField } from '../typings'
import type { Block } from './Block'
import type { Indexed } from './isObject'
import type { Validator } from './InputValidator'


// FIXME: Из этого метода нужно возрващать данные. + Надо понимать, прошла ли валидация
export function formSubmit (e: SubmitEvent, formInputs: Record<string, FormTextField>, ErrorRefs: Record<string, Block>): boolean {
	e.preventDefault()
	const formValues: Record<string, unknown> = {}
	const formData = new FormData(e.target as HTMLFormElement)
	let errorsExist = false

	for (const [key, value] of formData.entries()) {
		console.log(key, value)
		formValues[key] = value
		const { validator, ref } = formInputs[key]
		if (!validator(value.toString())) {
			ErrorRefs[ref].references['error'].show()
			errorsExist = true
		} else {
			ErrorRefs[ref].references['error'].hide()
		}
	}
	return errorsExist
}

export function getFormData (elem: HTMLFormElement): Indexed {
	const formValues: Indexed = {}
	const formData = new FormData(elem)

	for (const [key, value] of formData.entries()) {
		formValues[key] = value
	}

	return formValues
}


// TODO: Implement
type Rules = { [key: string]: { validator: Validator }}
export function validate (formValues: Indexed, rules: Rules) {
	// const errors: string[] = []

	Object.keys(formValues).forEach(key => {
		const value = formValues[key] as string
		if (key in rules) {
			const res = rules[key].validator(value)
			console.log(res)
		}
	})
}
