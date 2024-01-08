import Customer from '../../customer/entity/customer'
import Order from '../entity/order'
import OrderItem from '../entity/order_item'
import OrderService from './order.service'

describe('Order service unit tests', () => {
	it('should throw error when order items are not provided to place order', () => {
		const customer = new Customer('1', 'c1')

		expect(() => {
			OrderService.placeOrder(customer, [])
		}).toThrow('Order must have at least one item')
	})

	it('should place an order', () => {
		const customer = new Customer('1', 'c1')
		const item = new OrderItem('1', 'item 1', 100, 'p1')

		const order = OrderService.placeOrder(customer, [item])
		expect(order.total()).toBe(100)
		expect(customer.rewardPoints).toBe(50)
	})

	it('should get total of all orders', () => {
		const orderItemOne = new OrderItem('1', 'item 1', 100, 'p1')
		const orderItemTwo = new OrderItem('1', 'item 1', 200, 'p2', 2)

		const orderOne = new Order('1', 'c1', [orderItemOne])
		const orderTwo = new Order('1', 'c1', [orderItemTwo])
		const orderThree = new Order('1', 'c1', [orderItemOne, orderItemTwo])

		const total = OrderService.total([orderOne, orderTwo, orderThree])

		expect(total).toBe(1000)
	})
})
