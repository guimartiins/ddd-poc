import Address from '../value-object/address'
import Customer from './customer'

describe('Customer unit tests', () => {
	it('should throw when id is empty', () => {
		expect(() => {
			new Customer('', 'John Doe')
		}).toThrow('Id is required')
	})

	it('should throw when name is empty', () => {
		expect(() => {
			new Customer('123', '')
		}).toThrow('Name is required')
	})

	it('should change name', () => {
		const customer = new Customer('123', 'John Doe')
		customer.changeName('Jane Doe')
		expect(customer.name).toEqual('Jane Doe')
	})

	it('should activate a customer', () => {
		const customer = new Customer('123', 'John Doe')
		const address = new Address('123', 'Street', '123', '123')
		customer.changeAddress(address)

		customer.activate()
		expect(customer.isActive()).toBeTruthy()
	})

	it('should throw an error when address is undefined', () => {
		const customer = new Customer('123', 'John Doe')

		expect(() => {
			customer.activate()
		}).toThrow('Address is invalid')
	})

	it('should add reward points', () => {
		const customer = new Customer('123', 'John Doe')
		expect(customer.rewardPoints).toBe(0)

		customer.addRewardPoints(10)
		expect(customer.rewardPoints).toBe(10)

		customer.addRewardPoints(20)
		expect(customer.rewardPoints).toBe(30)
	})
})
