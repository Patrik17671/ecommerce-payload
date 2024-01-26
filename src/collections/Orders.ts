import { CollectionConfig} from 'payload/types';

const Orders: CollectionConfig = {
	slug: 'orders',
	access: {
		create: () => true,
		read: () => true,
		update: () => true
	},
	fields: [
		{
			name: 'cartHash',
			type: 'text',
			required: true,
			unique: true,
		},
		{
			name: 'items',
			type: 'array',
			fields: [
				{
					name: 'productId',
					type: 'relationship',
					relationTo: 'products',
				},
				{
					name: 'quantity',
					type: 'number',
				},
				{
					name: 'selectedSize',
					type: 'text',
				},
			],
		},
		{
			name: 'deliveryAddress',
			type: 'group',
			fields: [
				{
					name: 'name',
					type: 'text',
				},
				{
					name: 'lastName',
					type: 'text',
				},
				{
					name: 'email',
					type: 'text',
				},
				{
					name: 'phone',
					type: 'text',
				},
				{
					name: 'town',
					type: 'text',
				},
			],
		},
		{
			name: 'selectedDelivery',
			type: 'relationship',
			relationTo: 'delivery',
		},
		{
			name: 'selectedPayment',
			type: 'relationship',
			relationTo: 'payments',
		},
		{
			name: 'totalPrice',
			type: 'number',
			admin: {
				readOnly: true,
			},
		},
	],
};

export default Orders;