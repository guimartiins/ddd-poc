export default class Product {
	private _id: string
	private _name: string
	private _price: number

	constructor(id: string, name: string, price: number) {
		this._id = id
		this._name = name
		this._price = price
		this.validate()
	}

	validate() {
		if (!this._id) throw new Error('Id is required')
		if (!this._name) throw new Error('Name is required')
		if (!this._price || this._price <= 0)
			throw new Error('Price must be greater than 0')
	}

	validatePrice(price: number) {
		if (!price || price <= 0)
			throw new Error('Price must be greater than 0')
	}

	get id(): string {
		return this._id
	}

	get name(): string {
		return this._name
	}

	get price(): number {
		return this._price
	}

	changeName(name: string) {
		this._name = name
	}

	changePrice(price: number) {
		this.validatePrice(price)
		this._price = price
	}
}
