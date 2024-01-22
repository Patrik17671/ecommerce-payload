import {CollectionBeforeChangeHook, CollectionConfig} from 'payload/types';
import payload from 'payload';

const calculateTotalPrice = async (items) => {
	let totalPrice = 0;
	for (const item of items) {
		const response = await payload.find({
			collection: 'products',
			where: {
				id: {
					equals: item.productId,
				},
			},
		});
		if (response && response.docs && response.docs.length > 0) {
			const product = response.docs[0];
			if (typeof product.price === 'string') {
				const productPrice = parseInt(product.price);
				if (!isNaN(productPrice)) {
					totalPrice += productPrice * item.quantity;
				}
			}
		}
	}

	return totalPrice;
};
const updateOrCreateCartItem = (items, newItem) => {
	const existingItemIndex = items.findIndex(item => item.productId === newItem.productId);

	if (existingItemIndex > -1) {
		items[existingItemIndex].quantity += newItem.quantity;
	} else {
		items.push(newItem);
	}
};

const beforeChangeHook: CollectionBeforeChangeHook = async ({
    data, operation, originalDoc
  }) => {

	if (operation === 'create') {
		data.totalPrice = await calculateTotalPrice(data.items);
	}

	if (operation === 'update' && originalDoc) {
		if (data.itemsToRemove) {
			data.items = originalDoc.items.filter(item => !data.itemsToRemove.includes(item.productId));
		} else {
			for (const newItem of data.items) {
				updateOrCreateCartItem(originalDoc.items, newItem);
			}
			data.items = originalDoc.items;
		}
		data.totalPrice = await calculateTotalPrice(data.items);
	}

	return data;
};

const Carts: CollectionConfig = {
	slug: 'carts',
	access: {
		create: () => true,
		read: () => true,
		update: () => true
	},
	hooks: {
		beforeChange: [beforeChangeHook]
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
			],
		},
		{
			name: 'selectedSize',
			type: 'text',
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

export default Carts;