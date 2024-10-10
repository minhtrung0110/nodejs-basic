import express from 'express'
import { notificationController } from '../controllers/index.js'

const notificationRoutes = express.Router()

notificationRoutes.post('/create', notificationController.create)


export default notificationRoutes
