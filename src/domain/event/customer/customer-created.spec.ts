import EventDispatcher from '../@shared/event-dispatcher'
import { CustomerCreatedEvent } from './customer-created.event'
import { SendConsoleLogWhenCustomerIsCreatedHandler } from './handler/send-console-log-when-customer-is-created.handler'
import SendConsoleLogWithDataWhenCustomerIsCreatedHandler from './handler/send-console-with-data-when-customer-is-created.handler'

describe('Customer created event unit tests', () => {
	it('should send two console.logs when customer is created', () => {
		const eventDispatcher = new EventDispatcher()
		const firstEventHandler =
			new SendConsoleLogWhenCustomerIsCreatedHandler()
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
			new SendConsoleLogWithDataWhenCustomerIsCreatedHandler()
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
		expect(firstConsoleLogSpy).toHaveBeenCalledWith('Customer created!')
		expect(secondEventHandlerSpy).toHaveBeenCalled()
		expect(secondConsoleLogSpy).toHaveBeenCalledWith(customerData)
	})
})
