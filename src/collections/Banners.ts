import { CollectionConfig } from 'payload/types';

export const Banners: CollectionConfig = {
	slug: 'banners',
	access: {
		read: () => true,
	},
	admin: {
		useAsTitle: 'title',
	},
	fields: [
		{
			name: 'url',
			label: 'Url',
			type: 'text',
		},
		{
			name: 'file',
			type: 'upload',
			relationTo: 'media-banners',
		},
		{
			name: 'location',
			label: 'Location',
			type: 'text'
		},
		{
			name: 'title',
			label: 'Title',
			type: 'textarea',
		},
	],
};
export default Banners;