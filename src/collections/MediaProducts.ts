import { CollectionConfig } from 'payload/types';

export const MediaProducts: CollectionConfig = {
	slug: 'media-products',
	access: {
		read: () => true,
	},
	upload: {
		disableLocalStorage: true,
		adminThumbnail: 'thumbnail',
		mimeTypes: ['image/*'],
	},
	fields: [
		{
			name: 'alt',
			type: 'text',
		},
	],
};
export default MediaProducts;