import type { FormInput } from '../typings/FormInput'
import type { Block } from './Block'

export function formSubmit (e: SubmitEvent, formInputs: Record<string, FormInput>, ErrorRefs: Record<string, Block>) {
	e.preventDefault()
	const formValues: Record<string, unknown> = {}
	const formData = new FormData(e.target as HTMLFormElement)

	for (const [key, value] of formData.entries()) {
		formValues[key] = value
		const { validator, ref } = formInputs[key]
		if (!validator(value.toString())) {
			ErrorRefs[ref].references['error'].show()
		} else {
			ErrorRefs[ref].references['error'].hide()
		}
	}
	console.log('Заполненные поля формы:', formValues)
}
