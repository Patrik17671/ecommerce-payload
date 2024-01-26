import {CollectionBeforeChangeHook, CollectionConfig} from 'payload/types';
import payload from 'payload';

const calculateTotalPrice = async (items,deliveryId,paymentId) => {
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

	if (deliveryId) {
		const deliveryResponse = await payload.find({
			collection: 'delivery',
			where: {
				id: {
					equals: deliveryId,
				},
			},
		});
		if (deliveryResponse && deliveryResponse.docs.length > 0) {
			totalPrice += deliveryResponse.docs[0].price as number;
		}
	}

	if (paymentId) {
		const paymentResponse = await payload.find({
			collection: 'payments',
			where: {
				id: {
					equals: paymentId,
				},
			},
		});
		if (paymentResponse && paymentResponse.docs.length > 0) {
			totalPrice += paymentResponse.docs[0].price as number;
		}
	}

	return totalPrice;
};
const updateOrCreateCartItem = (items, newItem) => {
	const existingItemIndex = items.findIndex(item =>
		item.productId === newItem.productId &&
		item.selectedSize === newItem.selectedSize
	);

	if (existingItemIndex > -1) {
		items[existingItemIndex].quantity += newItem.quantity;
	} else {
		items.push(newItem);
	}
};

const beforeChangeHook: CollectionBeforeChangeHook = async ({
  data, operation, originalDoc, req
}) => {

	if (operation === 'create') {
		data.totalPrice = await calculateTotalPrice(data.items, data.selectedDelivery, data.selectedPayment);
	}

	if (operation === 'update' && originalDoc) {
		Object.keys(req.body).forEach(key => {
			data[key] = req.body[key];
		});

		if (req.body.items || req.body.itemsToRemove) {
			let updatedItems = req.body.itemsToRemove ?
				originalDoc.items.filter(item => !req.body.itemsToRemove.includes(item.productId)) :
				[...originalDoc.items];

			if (req.body.items) {
				req.body.items.forEach(newItem => {
					updateOrCreateCartItem(updatedItems, newItem);
				});
			}

			data.items = updatedItems;
		}

		data.totalPrice = await calculateTotalPrice(data.items, data.selectedDelivery, data.selectedPayment);

		if (req.body.createOrder) {
			const orderData = {
				cartHash: data.cartHash,
				items: data.items,
				deliveryAddress: data.deliveryAddress,
				selectedDelivery: data.selectedDelivery,
				selectedPayment: data.selectedPayment,
				totalPrice: data.totalPrice,
			};

			await payload.create({
				collection: 'orders',
				data: orderData,
			});

		}
	}

	return data;
};

const Carts: CollectionConfig = {
	slug: 'carts',
	access: {
		create: () => true,
		read: () => true,
		update: () => true,
		delete: () => true
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

export default Carts;