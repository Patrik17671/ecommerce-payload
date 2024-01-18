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
		{
			name: 'price',
			label: 'Price',
			type: 'text',
			required: true
		},
		{
			name: 'sizes',
			label: 'Sizes',
			type: 'array',
			fields: [
				{
					type: 'text',
					name: 'size',
					label: 'Size'
				}
			],
		},
		{
			name: 'colors',
			label: 'Colors',
			type: 'array',
			fields: [
				{
					type: 'text',
					name: 'color',
					label: 'Color'
				}
			],
		},
	],
};
export default Products;