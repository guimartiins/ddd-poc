import Address from '../../domain/entity/address'
import Customer from '../../domain/entity/customer'
import CustomerRepositoryInterface from '../../domain/repository/customer-repository.interface'
import CustomerModel from '../db/sequelize/model/customer.model'

export default class CustomerRepository implements CustomerRepositoryInterface {
	async create(entity: Customer): Promise<void> {
		await CustomerModel.create({
			id: entity.id,
			name: entity.name,
			street: entity.address?.street,
			city: entity.address?.city,
			state: entity.address?.state,
			zipCode: entity.address?.zipCode,
			rewardPoints: entity.rewardPoints,
			active: entity.isActive(),
		})
	}
	async update(entity: Customer): Promise<void> {
		await CustomerModel.update(
			{
				name: entity.name,
				street: entity.address?.street,
				city: entity.address?.city,
				state: entity.address?.state,
				zipCode: entity.address?.zipCode,
				rewardPoints: entity.rewardPoints,
				active: entity.isActive(),
			},
			{ where: { id: entity.id } }
		)
	}
	async find(id: string): Promise<Customer> {
		const customerModel = await CustomerModel.findOne({
			where: { id },
		})

		if (!customerModel) {
			throw new Error('Customer not found')
		}

		const customer = new Customer(customerModel.id, customerModel.name)

		const address = new Address(
			customerModel.street,
			customerModel.city,
			customerModel.state,
			customerModel.zipCode
		)

		customerModel.active && customer.activate()
		customer.changeAddress(address)
		customer.addRewardPoints(customerModel.rewardPoints)

		return customer
	}
	async findAll(): Promise<Customer[]> {
		const customerModels = await CustomerModel.findAll()

		return customerModels.map((customerModel) => {
			const customer = new Customer(customerModel.id, customerModel.name)

			const address = new Address(
				customerModel.street,
				customerModel.city,
				customerModel.state,
				customerModel.zipCode
			)

			customerModel.active && customer.activate()
			customer.changeAddress(address)
			customer.addRewardPoints(customerModel.rewardPoints)

			return customer
		})
	}
}
