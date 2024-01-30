import { CollectionConfig} from 'payload/types';

const Parameters: CollectionConfig = {
	slug: 'parameters',
	access: {
		read: () => true,
	},
	admin: {
		useAsTitle: 'name',
	},
	fields: [
		{
			name: 'sizes',
			type: 'relationship',
			relationTo: 'sizes',
			hasMany: true,
		},
		{
			name: 'colors',
			type: 'relationship',
			relationTo: 'colors',
			hasMany: true,
		},
	],
};

export default Parameters;