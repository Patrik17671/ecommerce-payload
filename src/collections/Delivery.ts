import { CollectionConfig} from 'payload/types';

const Delivery: CollectionConfig = {
	slug: 'delivery',
	access: {
		read: () => true,
	},
	fields: [
		{
			name: 'name',
			type: 'text',
		},
		{
			name: 'price',
			type: 'number',
		},
	],
};

export default Delivery;