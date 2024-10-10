import HttpStatusCodes from '../exceptions/HttpStatusCode.js'
import admin from 'firebase-admin'
import dotenv from 'dotenv'
import path from 'path'
import { fileURLToPath } from 'url'

// Load environment variables
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
dotenv.config({ path: path.resolve(__dirname, '../.env.development.local') })

// Firebase Admin SDK initialization
if (!admin.apps.length) {
    const config = {
        project_id: process.env.FIREBASE_PROJECT_ID,
        client_email: process.env.FIREBASE_CLIENT_EMAIL,
        private_key: process.env.FIREBASE_PRIVATE_KEY,
    }
    admin.initializeApp({
        credential: admin.credential.cert(config),
    })
}

// Send Notification function
const create = async (req, res) => {

    try {
        const { token, title, message, link } = req.body

        // Prepare the message payload
        const payload = {
            token,
            notification: {
                title: title,
                body: message,
            },
            webpush: link ? {
                fcmOptions: {
                    link,
                },
            } : undefined,
        }

        // Send notification via Firebase
        const response = await admin.messaging().send(payload)

        return res.status(HttpStatusCodes.CREATED).json({
            status: 200,
            message: 'Notification sent successfully',
            data: response,
        })
    } catch (error) {
        console.error(error)
        return res
            .status(HttpStatusCodes.BAD_REQUEST)
            .json({ status: 400, data: null, message: 'Failed to send notification' })
    }
}

export default {
    create,
}