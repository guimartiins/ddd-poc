import EventHandlerInterface from '../../../@shared/event/event-handler.interface'
import { CustomerUpdatedEvent } from '../customer-updated.event'

export default class SendConsoleLogWithDataWhenCustomerIsUpdatedHandler
	implements EventHandlerInterface<CustomerUpdatedEvent>
{
	handle(event: CustomerUpdatedEvent): void {
		console.log(
			`Endereço do cliente: ${event.eventData.id}, ${event.eventData.name} alterado para ${event.eventData.address.street}, ${event.eventData.address.city}, ${event.eventData.address.state}, ${event.eventData.address.zipCode}`
		)
	}
}
