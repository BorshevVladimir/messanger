import { expect } from 'chai'
import sinon from 'sinon'
import { BlockConstructable } from '../utils/Block.ts'
import { router } from './Router.ts'

describe('Router', async () => {
	global.window.history.back = () => {
		if (typeof window.onpopstate === 'function') {
			window.onpopstate({ currentTarget: window } as unknown as PopStateEvent)
		}
	}
	global.window.history.forward = () => {
		if (typeof window.onpopstate === 'function') {
			window.onpopstate({ currentTarget: window } as unknown as PopStateEvent)
		}
	}

	const getFakeContent = sinon.fake.returns(document.createElement('div'))
	const fakeComponentDidMount = sinon.fake.returns(true)

	beforeEach(() => {
		getFakeContent.resetHistory()
		fakeComponentDidMount.resetHistory()
		router.reset()
	})

	const BlockMock = class {
		getContent = getFakeContent
		dispatchComponentDidMount = fakeComponentDidMount
	} as unknown as BlockConstructable

	it('use() should return Router instance', () => {
		const reuslt = router.use('/', BlockMock)
		expect(reuslt).to.eq(router)
	})

	it('useNotFound() should return Router instance', () => {
		const reuslt = router.useNotFound(BlockMock)
		expect(reuslt).to.eq(router)
	})

	it('start() should return Router instance', () => {
		const reuslt = router.start()
		expect(reuslt).to.eq(router)
	})

	it('should render a page on start', () => {
		router.use('/', BlockMock).start()

		expect(getFakeContent.calledOnce).to.eq(true)
	})

	it('should render a page on go call', () => {
		router.use('/', BlockMock).use('/test', BlockMock).start().go('/test')

		expect(getFakeContent.calledTwice).to.eq(true)
	})

	it('should render a page on history back action', () => {
		router.use('/', BlockMock).use('/test', BlockMock).start().go('/test')

		router.back()

		expect(getFakeContent.calledTwice).to.eq(true)
	})

	it('should render a page on history forward action', () => {
		router.use('/', BlockMock).use('/test', BlockMock).start().go('/test')

		router.back()
		router.forward()

		expect(getFakeContent.calledTwice).to.eq(true)
	})

	it('should render notFount page when go to non-existent rout', () => {
		router.useNotFound(BlockMock).start()

		expect(getFakeContent.calledOnce).to.eq(true)
	})

	it('should change url on go call', () => {
		const testUrl = '/test-url'
		router.use('/', BlockMock).use(testUrl, BlockMock).start().go(testUrl)

		expect(window.location.pathname).to.eq(testUrl)
	})
})
