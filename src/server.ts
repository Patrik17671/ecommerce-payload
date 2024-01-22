import express from 'express'
import dotenv from 'dotenv'
import payload from 'payload'
import { mediaManagement } from "payload-cloudinary-plugin";
import path from "path";

dotenv.config({
	path: path.resolve(__dirname, '../.env'),
})

require('dotenv').config()
const app = express()

// Redirect root to Admin panel
app.get('/', (_, res) => {
  res.redirect('/admin')
})

//cloudinary
app.use(mediaManagement());

// Api token
const apiTokenMiddleware = (req, res, next) => {
	const origin = req.get('origin');

	const WHITELIST_ORIGINS = process.env.WHITELIST_ORIGINS.split(',');

	if (origin && !WHITELIST_ORIGINS.includes(origin)) {
		const token = req.headers.authorization?.split(' ')[1];
		if (token === process.env.PAYLOAD_API_TOKEN) {
			next();
		} else {
			res.status(401).send('Unauthorized');
		}
	} else {
		next();
	}
};


app.use(apiTokenMiddleware);

const start = async () => {
  // Initialize Payload
  await payload.init({
    secret: process.env.PAYLOAD_SECRET,
    express: app,
    onInit: async () => {
      payload.logger.info(`Payload Admin URL: ${payload.getAdminURL()}`)
    },
  })

  // Add your own express routes here

  app.listen(3000)
}

start()
