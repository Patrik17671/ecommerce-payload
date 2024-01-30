import { CollectionConfig} from 'payload/types';

const Colors: CollectionConfig = {
	slug: 'colors',
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

export default Colors;