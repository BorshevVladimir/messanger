import { Block } from '../../../utils/Block'
import { Input } from '../input'
import template from './form-input.hbs'
import './form-input.scss'

type FormInputType = 'text' | 'email' | 'tel' | 'password'

type FormInputProps = {
	name: string
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
			onInputBlur: () => {
				this.checkIsValid()
			}
		})
	}

	checkIsValid (): boolean {
		const { validator } = this.props
		// Если нет валидатора, то проверять на ошибки не нужно
		if (!validator) {
			return true
		}

		const value = (this.refs['input'] as Input).getValue()
		const isValid = validator(value)
		this._showError(isValid)
		return isValid
	}

	private _showError (isValid: boolean) {
		if (!isValid) {
			this.refs['error'].show()
		} else {
			this.refs['error'].hide()
		}
	}

	getName (): string {
		return this.props.name
	}

	getValue (): string {
		return (this.refs['input'] as Input).getValue()
	}

	render () {
		return this.compile(template, this.props)
	}
}
