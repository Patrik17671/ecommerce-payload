import { CollectionConfig } from 'payload/types';
import slugify from 'slugify';

export const Products: CollectionConfig = {
	slug: 'products',
	access: {
		read: () => true,
	},
	admin: {
		useAsTitle: 'name',
	},
	hooks: {
		beforeChange: [({ data }) => {
			if (data.name && !data.url) {
				data.url = slugify(data.name, { lower: true });
			}
		}],
	},
	fields: [
		{
			name: 'name',
			label: 'Name',
			type: 'text',
			required: true
		},
		{
			name: 'description',
			label: 'Description',
			type: "richText",
		},
		{
			name: 'file',
			type: 'upload',
			required: true,
			relationTo: 'media-products',
		},
		{
			name: 'url',
			label: 'URL Slug',
			type: 'text',
			admin: {
				readOnly: true,
			}
		},
		{
			name: 'categories',
			type: 'relationship',
			relationTo: 'categories',
			hasMany: true,
			admin: {
				position: 'sidebar',
			},
		},
	],
};
export default Products;