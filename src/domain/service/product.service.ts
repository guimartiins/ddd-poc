import Product from '../entity/product'

export default class ProductService {
	// Domain services são stateless, portanto não devem guardar estado
	// métodos estáticos são uma boa opção para domain services
	static increasePrice(products: Product[], percentage: number): void {
		products.forEach((product) => {
			const finalPrice =
				product.price * (percentage / 100) + product.price
			product.changePrice(finalPrice)
		})
	}
}
