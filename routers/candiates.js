import express from 'express'
import { candidateController } from '../controllers/index.js'

const candidateRouter = express.Router()

candidateRouter.get('/', candidateController.getAll)

candidateRouter.get('/:id', candidateController.getById)

candidateRouter.post('/', candidateController.create)

candidateRouter.put('/:id', candidateController.update)

candidateRouter.delete('/:id', candidateController.remove)

export default candidateRouter
