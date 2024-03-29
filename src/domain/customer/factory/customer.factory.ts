import Customer from '../entity/customer'
import { randomUUID } from 'crypto'
import Address from '../value-object/address'

export default class CustomerFactory {
	static create(name: string): Customer {
		return new Customer(randomUUID(), name)
	}

	static createWithAddress(name: string, address: Address): Customer {
		const customer = this.create(name)
		customer.changeAddress(address)
		return customer
	}
}
