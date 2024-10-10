import HttpStatusCodes from '../exceptions/HttpStatusCode.js'
import admin from 'firebase-admin'
import { appConfig } from '../config/config.js'
// Firebase Admin SDK initialization
if (!admin.apps.length) {

    admin.initializeApp({
        credential: admin.credential.cert(appConfig),
    });
}

// Send Notification function
const create = async (req, res) => {
    console.log('Testing',req)
    try {
        const { token, title, message, link } = req.body;

        // Prepare the message payload
        const payload = {
            token,
            notification: {
                title: title,
                body: message,
            },
            webpush: link && {
                fcmOptions: {
                    link,
                },
            },
        };

        // Send notification via Firebase
        const response = await admin.messaging().send(payload);

        return res.status(HttpStatusCodes.CREATED).json({
            status:200,
            message: 'Notification sent successfully',
            data: response,
        });
    } catch (error) {
        console.log(error.toString());
        return res
            .status(HttpStatusCodes.BAD_REQUEST)
            .json({ status:400,data:null, message: 'Failed to send notification' });
    }
};

export default {
    create,
};
