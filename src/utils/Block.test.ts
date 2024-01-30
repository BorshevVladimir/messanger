import esmock from 'esmock'
import { expect } from 'chai'
import sinon from 'sinon'
import type { BlockConstructable } from './Block'

const eventBusMock = {
	on: sinon.fake(),
	emit: sinon.fake(),
}

describe('Block', () => {
	let ComponentMock: BlockConstructable

	before(async () => {
		const { Block } = await esmock('./Block', {
			'./EventBus': {
				EventBus: class {
					emit = eventBusMock.emit
					on = eventBusMock.on
				},
			},
		})

		ComponentMock = class extends Block {}
	})

	it('should fire init event on initialization', () => {
		new ComponentMock({})
		expect(eventBusMock.emit.calledWith('init')).to.eq(true)
	})

	it('should fire ComponentDidUpdate event on props update', () => {
		const componentMock = new ComponentMock({})

		componentMock.setProps({ test: 'test' })

		expect(eventBusMock.emit.calledWith('flow:component-did-update')).to.eq(
			true
		)
	})

	it('should fire ComponentDidMount event on dispatchComponentDidMount call', () => {
		const componentMock = new ComponentMock({})
		componentMock.dispatchComponentDidMount()
		expect(eventBusMock.emit.calledWith('flow:component-did-mount')).to.eq(true)
	})
})
