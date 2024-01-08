import Customer from '../entity/customer'
import Address from '../value-object/address'
import CustomerFactory from './customer.factory'

describe('Customer factory unit tests', () => {
	it('should create a customer', () => {
		const customer = CustomerFactory.create('Customer A')

		expect(customer.id).toBeDefined()
		expect(customer.name).toBe('Customer A')
		expect(customer.address).toBeUndefined()
		expect(customer).toBeInstanceOf(Customer)
	})

	it('should create a customer with address', () => {
		const address = new Address(
			'Address A',
			'City A',
			'State A',
			'12345-678'
		)
		const customer = CustomerFactory.createWithAddress(
			'Customer A',
			address
		)
	})
})
