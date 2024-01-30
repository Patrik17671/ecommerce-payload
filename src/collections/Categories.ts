import type { CollectionConfig } from 'payload/types'

const Categories: CollectionConfig = {
  slug: 'categories',
  admin: {
    useAsTitle: 'title',
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'title',
      type: 'text',
    },
	  {
		  name: 'url',
		  type: 'text',
	  },
	  {
		  name: 'value',
		  type: 'text',
	  },
	  {
		  name: 'description',
		  type: 'richText',
	  },
  ],
}

export default Categories
