import Address from './address'

export default class Customer {
	// Uma entidade é única (possui um id a fim de ser distinguida e identificada)
	// Uma entidade é considera anêmica quando possui apenas atributos, getters, setters e nenhum método que envolva regras de negócio

	// Uma entidade é responsável por representar um objeto de negócio e carrega as regras de negócio
	// Uma entidade precisa se autovalidar

	_id: string
	_name: string = ''
	_address: Address = new Address('', '', '', '')
	_active: boolean = false

	constructor(id: string, name: string) {
		this._id = id
		this._name = name
		this.validate()
	}

	validate() {
		if (this._name.length === 0) {
			throw new Error('Name is required')
		}

		if (this._id.length === 0) {
			throw new Error('Id is required')
		}
	}

	changeName(name: string) {
		this._name = name
	}

	activate() {
		if (!this._address.validate()) {
			throw new Error('Address is invalid')
		}
		this._active = true
	}
}

// wrong approach: const customer = new Customer('1')
