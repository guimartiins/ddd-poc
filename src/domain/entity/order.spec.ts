import Order from './order'
import OrderItem from './order_item'

describe('Order unit tests', () => {
	it('should throw when id is empty', () => {
		expect(() => {
			new Order('', '123', [])
		}).toThrow('Id is required')
	})

	it('should throw when customerId is empty', () => {
		expect(() => {
			new Order('123', '', [])
		}).toThrow('CustomerId is required')
	})

	it('should throw when items is empty', () => {
		expect(() => {
			new Order('123', '123', [])
		}).toThrow('Items are required')
	})

	it('should calculate total', () => {
		const order = new Order('123', '123', [
			new OrderItem('1', 'product 1', 10, '1'),
			new OrderItem('2', 'product 2', 20, '2', 2),
			new OrderItem('3', 'product 3', 30, '3'),
		])

		expect(order.total()).toEqual(80)
	})

	it('should throw error if the quantity is less or equals 0', () => {
		expect(() => {
			new OrderItem('1', 'product 1', 10, '1', 0)
		}).toThrow('Quantity must be greater than 0')
		expect(() => {
			new OrderItem('1', 'product 1', 10, '1', -2)
		}).toThrow('Quantity must be greater than 0')
	})
})
