import Product from '../entity/product'
import ProductFactory from './product.factory'

describe('Product factory unit tests', () => {
	it('should create a product type A', () => {
		const product = ProductFactory.create('A', 'Product A', 10)

		expect(product.id).toBeDefined()
		expect(product.name).toBe('Product A')
		expect(product.price).toBe(10)
		expect(product).toBeInstanceOf(Product)
	})

	it('should throw an error when product type is invalid', () => {
		expect(() => ProductFactory.create('C', 'Product C', 30)).toThrow(
			'Invalid product type'
		)
	})
})
