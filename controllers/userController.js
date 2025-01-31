import HttpStatusCodes from '../exceptions/HttpStatusCode.js'
import { MAX_RECORD } from '../constants/global_constant.js'
import userRepository from '../repositoies/userRepository.js'

const create = async (req, res) => {
    try {
        const newUser = await userRepository.insert(req.body)
        if (!!newUser)
            return res.status(HttpStatusCodes.CREATED).json({
                message: 'Insert user successfully',
                data: newUser,
            })
    } catch (e) {
        //debugger
        console.log(e.toString())
        return res
            .status(HttpStatusCodes.BAD_REQUEST)
            .json({ message: 'Cannot insert user' })
    }
}

const update = async (req, res) => {
    debugger
    try {
        const result = await userRepository.update(req.params.id, req.body)
        if (!!result)
            return res.status(HttpStatusCodes.CREATED).json({
                message: 'Update user successfully',
                data: result,
            })
    } catch (e) {
        //debugger
        return res
            .status(HttpStatusCodes.BAD_REQUEST)
            .json({ message: 'Cannot update user' })
    }
}

const remove = async (req, res) => {
    debugger
    try {
        const result = await userRepository.remove(req.params.id)
        if (!!result)
            return res.status(HttpStatusCodes.CREATED).json({
                message: 'Delete user successfully',
                data: [],
            })
    } catch (e) {
        //debugger
        return res
            .status(HttpStatusCodes.BAD_REQUEST)
            .json({ message: 'Cannot delete user' })
    }
}
const getAll = async (req, res) => {
    try {
        let { page = 1, size = MAX_RECORD, searchString = '' } = req.query

        const result = await userRepository.getAllUsers({
            page,
            size,
            searchString,
        })
        res.status(HttpStatusCodes.OK).json({
            message: 'Get All Users Successfully',
            ...result,
        })
    } catch (err) {
        res.status(HttpStatusCodes.BAD_REQUEST).json({
            message: `Get All Users Fail ${err.toString()}`,
            data: [],
        })
    }
}
const getById = async (req, res) => {
    try {
        const id = req.params.id
        console.log('ID:', id)
        if (id.match(/^[0-9a-fA-F]{24}$/)) {
            const user = await userRepository.getUserById(id)
            return res.status(HttpStatusCodes.OK).json({
                message: 'Get User Successfully',
                data: user,
            })
        }
    } catch (err) {
        return res
            .status(HttpStatusCodes.BAD_REQUEST)
            .json({ message: 'Canot get detail user !' })
    }
}

export default {
    getAll,
    getById,
    create,
    update,
    remove,
}
