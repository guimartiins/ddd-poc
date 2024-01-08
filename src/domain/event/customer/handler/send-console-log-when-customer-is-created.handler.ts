import EventHandlerInterface from '../../@shared/event-handler.interface'
import { CustomerCreatedEvent } from '../customer-created.event'

export class SendConsoleLogWhenCustomerIsCreatedHandler
	implements EventHandlerInterface<CustomerCreatedEvent>
{
	handle(_event: CustomerCreatedEvent): void {
		console.log('Customer created!')
	}
}
