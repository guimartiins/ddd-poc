import EventDispatcher from '../../@shared/event/event-dispatcher'
import { CustomerCreatedEvent } from './customer-created.event'
import { SendFirstConsoleLogWhenCustomerIsCreatedHandler } from './handler/send-first-console-log-when-customer-is-created.handler'
import { SendSecondConsoleLogWhenCustomerIsCreatedHandler } from './handler/send-second-console-log-when-customer-is-created.handler'

describe('Customer created event unit tests', () => {
	it('should send two console.logs when customer is created', () => {
		const eventDispatcher = new EventDispatcher()
		const firstEventHandler =
			new SendFirstConsoleLogWhenCustomerIsCreatedHandler()
		eventDispatcher.register('CustomerCreatedEvent', firstEventHandler)

		const firstEventHandlerSpy = jest.spyOn(firstEventHandler, 'handle')
		const firstConsoleLogSpy = jest.spyOn(console, 'log')

		expect(
			eventDispatcher.getEventHandlers['CustomerCreatedEvent']
		).toBeDefined()
		expect(
			eventDispatcher.getEventHandlers['CustomerCreatedEvent'].length
		).toBe(1)

		const secondEventHandler =
			new SendSecondConsoleLogWhenCustomerIsCreatedHandler()
		const secondEventHandlerSpy = jest.spyOn(secondEventHandler, 'handle')
		const secondConsoleLogSpy = jest.spyOn(console, 'log')
		eventDispatcher.register('CustomerCreatedEvent', secondEventHandler)

		expect(
			eventDispatcher.getEventHandlers['CustomerCreatedEvent'].length
		).toBe(2)

		const customerData = {
			id: '123',
			name: 'John Doe',
		}

		const customer = new CustomerCreatedEvent(customerData)

		eventDispatcher.notify(customer)

		expect(firstEventHandlerSpy).toHaveBeenCalled()
		expect(firstConsoleLogSpy).toHaveBeenCalledWith(
			'Esse é o primeiro console.log do evento: CustomerCreated!'
		)
		expect(secondEventHandlerSpy).toHaveBeenCalled()
		expect(secondConsoleLogSpy).toHaveBeenCalledWith(
			'Esse é o segundo console.log do evento: CustomerCreated!'
		)
	})
})
