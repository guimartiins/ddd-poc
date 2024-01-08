export default class OrderItem {
	private _id: string
	private _name: string
	private _price: number
	private _quantity: number
	private _productId: string

	constructor(
		id: string,
		name: string,
		price: number,
		productId: string,
		quantity: number = 1
	) {
		this._id = id
		this._name = name
		this._price = price
		this._quantity = quantity
		this._productId = productId

		this.validate()
	}

	get id(): string {
		return this._id
	}

	get name(): string {
		return this._name
	}

	get quantity(): number {
		return this._quantity
	}

	get price(): number {
		return this._price
	}

	get productId(): string {
		return this._productId
	}

	validate() {
		if (this._quantity <= 0)
			throw new Error('Quantity must be greater than 0')
	}

	orderItemTotal(): number {
		return this._price * this._quantity
	}

	changeQuantity(quantity: number): void {
		this._quantity = quantity
	}
}
