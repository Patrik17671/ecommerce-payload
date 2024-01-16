import { CollectionConfig } from 'payload/types';

export const MediaBanners: CollectionConfig = {
	slug: 'media-banners',
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
export default MediaBanners;