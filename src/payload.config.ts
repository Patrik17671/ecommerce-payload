import path from 'path'
import { mongooseAdapter } from '@payloadcms/db-mongodb'
import { webpackBundler } from '@payloadcms/bundler-webpack'
import { slateEditor } from '@payloadcms/richtext-slate'
import { buildConfig } from 'payload/config'
import cloudinaryPlugin from "payload-cloudinary-plugin/dist/plugins";
import Users from './collections/Users'
import Banners from './collections/Banners'
import MediaBanners from "./collections/MediaBanners";
import MediaProducts from "./collections/MediaProducts";
import Categories from "./collections/Categories";
import Products from "./collections/Products";
import Header from "./globals/Header";
import MediaCategories from "./collections/MediaCategories";
import Carts from "./collections/Carts";
import dotenv from 'dotenv'
import Delivery from "./collections/Delivery";
import Payments from "./collections/Payments";
import Orders from "./collections/Orders";
import Colors from "./collections/Colors";
import Sizes from "./collections/Sizes";
import Parameters from "./collections/Parameters";

dotenv.config({
	path: path.resolve(__dirname, '../../.env'),
})
const mockModulePath = path.resolve(__dirname, 'mocks', 'emptyFunction.js');

export default buildConfig({
  admin: {
    user: Users.slug,
    bundler: webpackBundler(),
	  webpack: (config) => ({
		  ...config,
		  resolve:{
			  ...config.resolve,
			  extensions: ['.js','.jsx','.ts','.tsx'],
			  alias: {
				  ...config.resolve.alias,
				  fs: mockModulePath,
			  }
		  }
	  })
  },
  editor: slateEditor({}),
  collections: [Users,MediaBanners,Banners,Categories,MediaProducts,Products,MediaCategories,Carts,Delivery,Payments,Orders,Colors,Sizes,Parameters],
	globals: [Header],
  typescript: {
    outputFile: path.resolve(__dirname, 'payload-types.ts'),
  },
  graphQL: {
    schemaOutputFile: path.resolve(__dirname, 'generated-schema.graphql'),
  },
  plugins: [ cloudinaryPlugin({ cloudinaryFields: ['file','imageSizes','sizes'] })],
  db: mongooseAdapter({
    url: process.env.DATABASE_URI,
  }),
	cors: process.env.WHITELIST_ORIGINS ? process.env.WHITELIST_ORIGINS.split(',') : [],
	csrf: process.env.WHITELIST_ORIGINS ? process.env.WHITELIST_ORIGINS.split(',') : [],
})
