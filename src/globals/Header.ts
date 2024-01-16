import { GlobalConfig } from "payload/types";

const Header: GlobalConfig = {
	slug: 'header',
	access: {
		read: () => true,
	},
	fields: [
		{
			name: 'categories',
			label: 'Categories',
			type: 'relationship',
			relationTo: 'categories',
			hasMany: true
		},
		{
			name: 'customLinks',
			label: 'Custom Links',
			type: 'array',
			fields: [
				{
					type: 'text',
					name: 'label',
					label: 'Link Label'
				},
				{
					type: 'text',
					name: 'url',
					label: 'Link URL'
				}
			]
		}
	]
};

export default Header;