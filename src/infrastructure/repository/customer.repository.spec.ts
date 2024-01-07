import { Sequelize } from 'sequelize-typescript'
import CustomerModel from '../db/sequelize/model/customer.model'
import Customer from '../../domain/entity/customer'
import Address from '../../domain/entity/address'
import CustomerRepository from './customer.repository'

describe('Customer repository unit tests', () => {
	let sequelize: Sequelize

	beforeEach(async () => {
		sequelize = new Sequelize({
			dialect: 'sqlite',
			storage: ':memory:',
			logging: false,
			sync: { force: true },
		})

		sequelize.addModels([CustomerModel])
		await sequelize.sync()
	})

	afterEach(async () => {
		await sequelize.close()
	})

	it('should create a customer', async () => {
		const customerRepository = new CustomerRepository()
		const customer = new Customer('1', 'customer 1')
		const address = new Address('street', 'city', 'state', 'zipCode')
		customer.changeAddress(address)

		await customerRepository.create(customer)

		const customerModel = await CustomerModel.findOne({
			where: { id: '1' },
		})

		expect(customerModel?.toJSON()).toStrictEqual({
			id: '1',
			name: 'customer 1',
			active: customer.isActive(),
			street: 'street',
			city: 'city',
			state: 'state',
			zipCode: 'zipCode',
			rewardPoints: customer.rewardPoints,
		})
	})
	it('should update a customer', async () => {
		const customerRepository = new CustomerRepository()
		const customer = new Customer('1', 'customer 1')
		const address = new Address('street', 'city', 'state', 'zipCode')
		customer.changeAddress(address)

		await customerRepository.create(customer)

		const customerModel = await CustomerModel.findOne({
			where: { id: '1' },
		})

		expect(customerModel?.toJSON()).toStrictEqual({
			id: '1',
			name: 'customer 1',
			active: customer.isActive(),
			street: 'street',
			city: 'city',
			state: 'state',
			zipCode: 'zipCode',
			rewardPoints: customer.rewardPoints,
		})

		customer.changeName('customer 2')

		await customerRepository.update(customer)

		const updatedCustomerModel = await CustomerModel.findOne({
			where: { id: '1' },
		})

		expect(updatedCustomerModel?.toJSON()).toStrictEqual({
			id: '1',
			name: 'customer 2',
			active: customer.isActive(),
			street: 'street',
			city: 'city',
			state: 'state',
			zipCode: 'zipCode',
			rewardPoints: customer.rewardPoints,
		})
	})
	it('should get a customer by id', async () => {
		const customerRepository = new CustomerRepository()
		const customer = new Customer('1', 'customer 1')
		const address = new Address('street', 'city', 'state', 'zipCode')
		customer.changeAddress(address)

		await customerRepository.create(customer)

		const customerModel = await customerRepository.find('1')

		expect(customer).toStrictEqual(customerModel)
	})

	it('should throw error if customer is not found', async () => {
		const customerRepository = new CustomerRepository()
		try {
			await customerRepository.find('1')
		} catch (error) {
			if (error instanceof Error) {
				expect(error.message).toBe('Customer not found')
			}
		}
	})

	it('should get all customers', async () => {
		const customerRepository = new CustomerRepository()
		const customerOne = new Customer('1', 'customer 1')
		const addressOne = new Address('street', 'city', 'state', 'zipCode')
		customerOne.changeAddress(addressOne)

		const customerTwo = new Customer('2', 'customer 2')
		const addressTwo = new Address('street', 'city', 'state', 'zipCode')
		customerTwo.changeAddress(addressTwo)

		const customerThree = new Customer('3', 'customer 3')
		const addressThree = new Address('street', 'city', 'state', 'zipCode')
		customerThree.changeAddress(addressThree)

		await customerRepository.create(customerOne)
		await customerRepository.create(customerTwo)
		await customerRepository.create(customerThree)

		const foundcustomers = await customerRepository.findAll()

		expect(foundcustomers).toHaveLength(3)
	})
})
