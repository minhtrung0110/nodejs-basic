import { validationResult } from 'express-validator'
import { authRepository } from '../repositoies/index.js'
import { EventEmitter } from 'node:events'
import HttpStatusCodes from '../exceptions/HttpStatusCode.js'

const myEvent = new EventEmitter()

myEvent.on('event.register.user', (params) => {
    console.log('Trigger Event')
})
export const loginController = async (req, res) => {
    debugger
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() })
    }
    const { email, password } = req?.body
    // check auth
    try {
        const auth = await authRepository.login({ email, password })
        res.status(HttpStatusCodes.OK).json({
            message: 'Login successfully!',
            data: auth,
        })
    } catch (err) {
        return res
            .status(HttpStatusCodes.BAD_REQUEST)
            .json({ message: err.toString(), data: null })
    }
}

export const registerController = async (req, res) => {
    console.log(req?.body)

    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        return res
            .status(HttpStatusCodes.BAD_REQUEST)
            .json({ errors: errors.array() })
    }
    try {
        const newCandidate = await authRepository.register(req?.body)
        res.status(HttpStatusCodes.CREATED).json({
            message: 'Register candidate successfully!',
            data: newCandidate,
        })
    } catch (err) {
        return res
            .status(HttpStatusCodes.BAD_REQUEST)
            .json({ message: err.toString(), data: null })
    }
}

export default {
    loginController,
    registerController,
}
