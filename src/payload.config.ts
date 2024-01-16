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

export default buildConfig({
  admin: {
    user: Users.slug,
    bundler: webpackBundler(),
  },
  editor: slateEditor({}),
  collections: [Users,MediaBanners,Banners,Categories,MediaProducts,Products,MediaCategories],
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
