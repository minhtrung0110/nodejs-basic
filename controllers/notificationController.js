import HttpStatusCodes from '../exceptions/HttpStatusCode.js'
import admin from 'firebase-admin'
import dotenv from 'dotenv'
import path from 'path'
import { fileURLToPath } from 'url'

// Load environment variables only in local development
if (process.env.VERCEL !== '1') {
    const __filename = fileURLToPath(import.meta.url)
    const __dirname = path.dirname(__filename)
    dotenv.config({ path: path.resolve(__dirname, '../.env.development.local') })
}

// Function to format the private key
const formatPrivateKey = (key) => {
    if (!key) return null;
    const header = '-----BEGIN PRIVATE KEY-----\n';
    const footer = '\n-----END PRIVATE KEY-----\n';
    const formattedKey = key.replace(/\\n/g, '\n').trim();

    if (formattedKey.includes(header) && formattedKey.includes(footer)) {
        return formattedKey;
    }

    return `${header}${formattedKey.replace(/-----BEGIN PRIVATE KEY-----|-----END PRIVATE KEY-----|\s/g, '')}${footer}`;
}

// Function to remove extra quotes
const removeExtraQuotes = (str) => {
    return str ? str.replace(/^["']|["']$/g, '') : '';
}

// Firebase Admin SDK initialization
if (!admin.apps.length) {
    const privateKey = formatPrivateKey(process.env.FIREBASE_PRIVATE_KEY);
    if (!privateKey) {
        throw new Error('FIREBASE_PRIVATE_KEY is not set or is invalid');
    }

    const config = {
        projectId: removeExtraQuotes(process.env.FIREBASE_PROJECT_ID),
        clientEmail: removeExtraQuotes(process.env.FIREBASE_CLIENT_EMAIL),
        privateKey: privateKey,
    }
    console.log('Firebase config:', {
        projectId: config.projectId,
        clientEmail: config.clientEmail,
        privateKeyLength: config.privateKey ? config.privateKey.length : 0,
    })
    try {
        admin.initializeApp({
            credential: admin.credential.cert(config),
        })
        console.log('Firebase Admin SDK initialized successfully');
    } catch (error) {
        console.error('Error initializing Firebase Admin SDK:', error);
        throw error;
    }
}

// Send Notification function
const create = async (req, res) => {
    console.log('Received notification request:', req.body)
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

        console.log('Notification sent successfully:', response)
        return res.status(HttpStatusCodes.CREATED).json({
            status: 200,
            message: 'Notification sent successfully',
            data: response,
        })
    } catch (error) {
        console.error('Failed to send notification:', error)
        return res
            .status(HttpStatusCodes.BAD_REQUEST)
            .json({ status: 400, data: null, message: 'Failed to send notification' })
    }
}

export default {
    create,
}