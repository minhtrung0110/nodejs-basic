import express from 'express'
import {
    getMessages,
    getUsersForSidebar,
    sendMessage,
} from '../controllers/messageController.js'

const router = express.Router()

router.get("/users",  getUsersForSidebar);
router.get("/:id",  getMessages); // userID

router.post("/send/:id",  sendMessage); // userId

export default router;