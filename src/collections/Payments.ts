import { CollectionConfig} from 'payload/types';

const Payments: CollectionConfig = {
	slug: 'payments',
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

export default Payments;