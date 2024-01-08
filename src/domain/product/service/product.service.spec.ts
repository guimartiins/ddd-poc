import Product from '../entity/product'
import ProductService from './product.service'

describe('Product service unit tests', () => {
	it('should change the price of all products', () => {
		const productOne = new Product('1', 'Product One', 10)
		const productTwo = new Product('2', 'Product Two', 20)
		const productThree = new Product('3', 'Product Three', 30)

		const products = [productOne, productTwo, productThree]

		ProductService.increasePrice(products, 100)

		expect(productOne.price).toBe(20)
		expect(productTwo.price).toBe(40)
		expect(productThree.price).toBe(60)
	})
})
