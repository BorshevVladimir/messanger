import { Block } from '../../../utils/Block'
import template from './upload-file.hbs'
import './upload-file.scss'

type UploadFileProps = {
	name: string
	accept: string
	onClick: () => void
	onLoad: () => FormData
	onSelect: (data: FormData) => void
}

export class UploadFile extends Block {
	constructor (props: UploadFileProps) {
		super({
			...props,
			onChange: (e: Event) => {
				console.log(this.props.name)
				const { target } = e
				if (target) {
					const file = (target as HTMLInputElement).files![0]
					if (file) {
						const formData = new FormData()
						formData.append(this.props.name as string, file)
						this.props.onSelect(formData)
					}
				}
			},
			events: {
				click: () => {
					this.refs['upload-file-input'].element?.click()
				},
			},
		})
	}
	render () {
		return this.compile(template, this.props)
	}
}
