import EventHandlerInterface from '../../../@shared/event/event-handler.interface'
import { CustomerCreatedEvent } from '../customer-created.event'

export class SendFirstConsoleLogWhenCustomerIsCreatedHandler
	implements EventHandlerInterface<CustomerCreatedEvent>
{
	handle(_event: CustomerCreatedEvent): void {
		console.log('Esse é o primeiro console.log do evento: CustomerCreated!')
	}
}
