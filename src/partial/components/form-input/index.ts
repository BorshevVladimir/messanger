import { Block } from '../../../utils/Block'
import template from './form-input.hbs'
import './form-input.scss'

type FormInputType = 'text' | 'email' | 'tel' | 'password'

type FormInputProps = {
	type: FormInputType
	error?: string
	value: unknown
	validator?: (value: string) => boolean
	showError: boolean
}

export class FormInput extends Block {
	constructor (props: FormInputProps) {
		super({
			...props,
			onInputBlur: (event: FocusEvent) => {
				const { value } = event.target as HTMLInputElement
				if (!this.props.validator) {
					return
				}

				const isValid = (this.props.validator as FormInputProps['validator'])!(value)
				if (!isValid) {
					this.refs['error'].show()
				} else {
					this.refs['error'].hide()
				}
			}
		})
	}

	render () {
		return this.compile(template, this.props)
	}
}
