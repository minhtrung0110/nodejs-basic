import express from 'express'
import { userController } from '../controllers/index.js'

const userRouter = express.Router()

userRouter.get('/', userController.getAll)

userRouter.get('/:id', userController.getById)

userRouter.post('/', userController.create)

userRouter.put('/:id', userController.update)

userRouter.delete('/:id', userController.remove)

export default userRouter
