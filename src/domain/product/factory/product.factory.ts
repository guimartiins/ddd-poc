import Product from '../entity/product'
import ProductInterface from '../entity/product.interface'
import { randomUUID } from 'crypto'

export default class ProductFactory {
	static create(type: string, name: string, price: number): ProductInterface {
		switch (type) {
			case 'A':
				return new Product(randomUUID(), name, price)
			default:
				throw new Error('Invalid product type')
		}
	}
}
