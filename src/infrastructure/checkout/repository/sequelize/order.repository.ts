import OrderModel from './order.model'
import OrderItemModel from './order-item.model'
import Order from '../../../../domain/checkout/entity/order'
import OrderRepositoryInterface from '../../../../domain/checkout/repository/order-repository.interface'
import OrderItem from '../../../../domain/checkout/entity/order_item'

export default class OrderRepository implements OrderRepositoryInterface {
	async create(entity: Order): Promise<void> {
		await OrderModel.create(
			{
				id: entity.id,
				customer_id: entity.customerId,
				total: entity.total(),
				items: entity.items.map((item: OrderItem) => {
					return {
						id: item.id,
						name: item.name,
						price: item.price,
						quantity: item.quantity,
						product_id: item.productId,
					}
				}),
			},
			{
				include: [{ model: OrderItemModel }],
			}
		)
	}

	async update(entity: Order): Promise<void> {
		await OrderModel.update(
			{
				id: entity.id,
				total: entity.total(),
			},
			{ where: { id: entity.id } }
		)

		entity.items.forEach(async (item: OrderItem) => {
			await OrderItemModel.update(
				{
					name: item.name,
					price: item.price,
					quantity: item.quantity,
					product_id: item.productId,
				},
				{ where: { id: item.id } }
			)
		})
	}

	async find(id: string): Promise<Order> {
		const orderModel = await OrderModel.findOne({
			where: { id },
			include: ['items'],
		})

		if (!orderModel) throw new Error('Order not found')

		const orderItems = orderModel.items.map(
			(item: OrderItemModel) =>
				new OrderItem(
					item.id,
					item.name,
					item.price,
					item.product_id,
					item.quantity
				)
		)

		const order = new Order(
			orderModel.id,
			orderModel.customer_id,
			orderItems
		)

		return order
	}
	async findAll(): Promise<Order[]> {
		const orderModels = await OrderModel.findAll({ include: ['items'] })

		return orderModels.map((orderModel: OrderModel) => {
			const orderItems = orderModel.items.map(
				(item: OrderItemModel) =>
					new OrderItem(
						item.id,
						item.name,
						item.price,
						item.product_id,
						item.quantity
					)
			)

			return new Order(orderModel.id, orderModel.customer_id, orderItems)
		})
	}
}
