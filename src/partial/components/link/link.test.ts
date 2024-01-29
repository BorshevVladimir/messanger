import { Link } from './index.ts'
import { expect } from 'chai'
import sinon from 'sinon'

describe('link component', () => {
	it('should render', () => {
		new Link({ href: '' })
	})

	it('should have href attribute', () => {
		const href = 'testHref'

		const link = new Link({
			href,
			onClick: () => {
			},
		})

		link.dispatchComponentDidMount()
		const compomnentHref = (link.element as HTMLLinkElement).href

		expect(href).to.eq(compomnentHref)
	})

	it('should fire onClick event on click', () => {
		const clickFake = sinon.fake()
		const link = new Link({
			href: '',
			onClick: () => {
				clickFake()
			},
		})

		const element = link.element as HTMLLinkElement
		element.click()

		expect(clickFake.calledOnce).to.eq(true)
	})

	it('should have link_error modifier if pass error flag', () => {
		const errorClass = 'link_error'
		const link = new Link({
			href: '',
			error: true,
			onClick: () => {}
		})
		link.dispatchComponentDidMount()
		const buttonClasses = (link.element as HTMLButtonElement).classList

		expect([...buttonClasses]).to.include(errorClass)
	})
})
