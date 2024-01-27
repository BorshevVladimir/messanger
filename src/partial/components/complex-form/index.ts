import { Block } from '../../../utils/Block'
import type { FormTextField, FormErrorDescription } from '../../../typings'
import { FormInput } from '../form-input'
import { Indexed } from '../../../utils/isObject'
import template from './complex-form.hbs'
import './complex-form.scss'

type ComplexFormProps = {
	id: string,
	classes?: string,
	formInputs: Record<string, FormTextField>
	onFormSubmit (data: { formValues: Indexed, errors: FormErrorDescription[] }): void
	submitButtonTitle?: string
}

export class ComplexForm extends Block {
	constructor (props: ComplexFormProps) {
		super({
			...props,
			onSubmit: (e: SubmitEvent) => this.submit(e)
		})
	}

	submit (e: SubmitEvent) {
		e.preventDefault()
		const errors: FormErrorDescription[] = []
		const formValues: Indexed = {}

		const formInputs = (this.props.formInputs as Record<string, FormTextField>)

		Object.keys(formInputs).forEach(name => {
			const input = formInputs[name]
			const formInput = this.refs[name] as FormInput

			const isValid = formInput.checkIsValid()
			if (!isValid) {
				errors.push({
					name,
					text: input.error
				})
			}

			formValues[name] = formInput.getValue()
		})

		this.props.onFormSubmit({ errors, formValues })
	}

	render () {
		return this.compile(template, this.props)
	}
}
