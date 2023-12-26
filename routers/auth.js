import express from 'express'
import { body } from 'express-validator'
import { authController } from '../controllers/index.js'

const authRoutes = express.Router()

authRoutes.post(
    '/login',
    body('email').isEmail(),
    body('password').isLength({ min: 5 }),
    authController.loginController
)
authRoutes.post(
    '/register',
    // body('email').isEmail(),
    // body('password').isLength({ min: 5 }),
    authController.registerController
)

export default authRoutes
