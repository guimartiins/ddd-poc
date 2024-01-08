import Address from './domain/customer/value-object/address'
import Customer from './domain/customer/entity/customer'
import Order from './domain/checkout/entity/order'
import OrderItem from './domain/checkout/entity/order_item'

const customer = new Customer('John', 'Doe')
const address = new Address('1', '123 Main St', 'Anytown', 'Anystate')
customer._address = address
customer.activate()

const firstItem = new OrderItem('1', 'Item 1', 100, '1')
const secondItem = new OrderItem('2', 'Item 2', 50, '2')

const order = new Order('1', customer._id, [firstItem, secondItem])
