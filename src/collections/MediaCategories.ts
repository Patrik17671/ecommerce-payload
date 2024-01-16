import { CollectionConfig } from 'payload/types';

export const MediaCategories: CollectionConfig = {
	slug: 'media-categories',
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
export default MediaCategories;