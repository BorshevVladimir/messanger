export type FormTextField = {
	label: string
	error: string
	placeholder?: string
	type: 'text' | 'password' | 'tel' | 'email'
	validator: (value: string) => boolean
	ref: string,
	value?: string
}
