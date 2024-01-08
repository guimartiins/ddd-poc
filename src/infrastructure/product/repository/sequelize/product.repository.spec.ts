import { Sequelize } from 'sequelize-typescript'
import Product from '../../../../domain/product/entity/product'
import ProductModel from './product.model'
import { ProductRepository } from './product.repository'

describe('Product repository unit tests', () => {
	let sequelize: Sequelize

	beforeEach(async () => {
		sequelize = new Sequelize({
			dialect: 'sqlite',
			storage: ':memory:',
			logging: false,
			sync: { force: true },
		})

		sequelize.addModels([ProductModel])
		await sequelize.sync()
	})

	afterEach(async () => {
		await sequelize.close()
	})

	it('should create a product', async () => {
		const productRepository = new ProductRepository()
		const product = new Product('1', 'Product 1', 100)

		await productRepository.create(product)

		const productModel = await ProductModel.findOne({ where: { id: '1' } })

		expect(productModel?.toJSON()).toStrictEqual({
			id: '1',
			name: 'Product 1',
			price: 100,
		})
	})
	it('should update a product', async () => {
		const productRepository = new ProductRepository()
		const product = new Product('1', 'Product 1', 100)

		await productRepository.create(product)

		const productModel = await ProductModel.findOne({ where: { id: '1' } })

		expect(productModel?.toJSON()).toStrictEqual({
			id: '1',
			name: 'Product 1',
			price: 100,
		})

		product.changeName('Product 2')
		product.changePrice(200)

		await productRepository.update(product)

		const productModelUpdated = await ProductModel.findOne({
			where: { id: '1' },
		})

		expect(productModelUpdated?.toJSON()).toStrictEqual({
			id: '1',
			name: 'Product 2',
			price: 200,
		})
	})
	it('should get a product by id', async () => {
		const productRepository = new ProductRepository()
		const product = new Product('1', 'Product 1', 100)

		await productRepository.create(product)

		const productModel = await ProductModel.findOne({ where: { id: '1' } })
		const foundProduct = await productRepository.find('1')

		expect(productModel?.toJSON()).toStrictEqual({
			id: foundProduct.id,
			name: foundProduct.name,
			price: foundProduct.price,
		})
	})

	it('should get all products', async () => {
		const productRepository = new ProductRepository()
		const productOne = new Product('1', 'Product 1', 100)
		const productTwo = new Product('2', 'Product 2', 200)
		const productThree = new Product('3', 'Product 3', 300)

		await productRepository.create(productOne)
		await productRepository.create(productTwo)
		await productRepository.create(productThree)

		const foundProducts = await productRepository.findAll()

		expect(foundProducts).toHaveLength(3)
	})

	it('should throw error if product does not exist', async () => {
		const productRepository = new ProductRepository()
		try {
			await productRepository.find('1')
		} catch (error) {
			if (error instanceof Error)
				expect(error.message).toMatch('Product not found')
		}
	})
})
