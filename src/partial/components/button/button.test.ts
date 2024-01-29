import { Button } from './index.ts'
import { expect } from 'chai'
import sinon from 'sinon'

describe('button component', () => {
	it('should render', () => {
		new Button({ onClick: () => {} })
	})

	it('should fire onClick event on click', () => {
		const clickFake = sinon.fake()
		const button = new Button({ onClick: clickFake })

		const element = button.element as HTMLButtonElement
		element.click()

		expect(clickFake.calledOnce).to.eq(true)
	})

	it('should have button_danger modifier if pass danger flag', () => {
		const dangerClass = 'button_danger'
		const button = new Button({ danger: true, onClick: () => {} })
		button.dispatchComponentDidMount()
		const buttonClasses = (button.element as HTMLButtonElement).classList

		expect([...buttonClasses]).to.include(dangerClass)
	})
})
