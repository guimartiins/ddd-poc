import EventDispatcher from '../../@shared/event/event-dispatcher'
import { CustomerCreatedEvent } from './customer-created.event'
import { CustomerUpdatedEvent } from './customer-updated.event'
import SendConsoleLogWithDataWhenCustomerIsUpdatedHandler from './handler/send-console-with-data-when-customer-is-updated.handler'

describe('Customer updated event unit tests', () => {
	it('should send console log with data when customer is updated', () => {
		const eventDispatcher = new EventDispatcher()
		const EventHandler =
			new SendConsoleLogWithDataWhenCustomerIsUpdatedHandler()
		eventDispatcher.register('CustomerUpdatedEvent', EventHandler)

		const EventHandlerSpy = jest.spyOn(EventHandler, 'handle')
		const ConsoleLogSpy = jest.spyOn(console, 'log')

		expect(
			eventDispatcher.getEventHandlers['CustomerUpdatedEvent']
		).toBeDefined()
		expect(
			eventDispatcher.getEventHandlers['CustomerUpdatedEvent'].length
		).toBe(1)

		const customerData = {
			id: '123',
			name: 'John Doe',
			address: {
				street: 'Rua Augusta',
				city: 'São Paulo',
				state: 'SP',
				zipCode: '01310-100',
			},
		}

		const customer = new CustomerUpdatedEvent(customerData)

		eventDispatcher.notify(customer)

		expect(EventHandlerSpy).toHaveBeenCalled()
		expect(ConsoleLogSpy).toHaveBeenCalledWith(
			'Endereço do cliente: 123, John Doe alterado para Rua Augusta, São Paulo, SP, 01310-100'
		)
	})
})
