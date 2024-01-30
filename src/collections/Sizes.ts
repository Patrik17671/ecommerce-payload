import { CollectionConfig} from 'payload/types';

const Sizes: CollectionConfig = {
	slug: 'sizes',
	access: {
		read: () => true,
	},
	admin: {
		useAsTitle: 'name',
	},
	fields: [
		{
			name: 'name',
			type: 'text',
		},
		{
			name: 'value',
			type: 'text',
		},
	],
};

export default Sizes;