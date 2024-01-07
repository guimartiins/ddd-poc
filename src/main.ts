import Address from './domain/entity/address'
import Customer from './domain/entity/customer'
import Order from './domain/entity/order'
import OrderItem from './domain/entity/order_item'

const customer = new Customer('John', 'Doe')
const address = new Address('1', '123 Main St', 'Anytown', 'Anystate')
customer._address = address
customer.activate()

const firstItem = new OrderItem('1', 'Item 1', 100, '1')
const secondItem = new OrderItem('2', 'Item 2', 50, '2')

const order = new Order('1', customer._id, [firstItem, secondItem])
