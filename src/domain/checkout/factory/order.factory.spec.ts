import { randomUUID } from 'crypto'
import Order from '../entity/order'
import OrderFactory from './order.factory'

describe('Order factory unit tests', () => {
	it('should create an order', () => {
		const orderProps = {
			id: randomUUID(),
			customerId: randomUUID(),
			items: [
				{
					id: randomUUID(),
					productId: randomUUID(),
					name: 'Product 1',
					quantity: 1,
					price: 100,
				},
			],
		}

		const order = OrderFactory.create(orderProps)

		expect(order.id).toEqual(orderProps.id)
		expect(order.customerId).toEqual(orderProps.customerId)
		expect(order.items.length).toBe(1)
		expect(order).toBeInstanceOf(Order)
	})
})
