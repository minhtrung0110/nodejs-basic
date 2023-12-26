import HttpStatusCodes from '../exceptions/HttpStatusCode.js'
import { candidateRepository } from '../repositoies/index.js'

const create = async (req, res) => {
    try {
        const newCandidate = await candidateRepository.insert(req.body)
        if (!!newCandidate)
            return res.status(HttpStatusCodes.CREATED).json({
                message: 'Insert candidate successfully',
                data: newCandidate,
            })
    } catch (e) {
        //debugger
        console.log(e.toString())
        return res
            .status(HttpStatusCodes.BAD_REQUEST)
            .json({ message: 'Cannot insert candidate' })
    }
}

const update = async (req, res) => {}

const remove = async (req, res) => {}
const getAll = async (req, res) => {
    res.status(HttpStatusCodes.OK).json({
        message: 'Get All Candidates Successfully',
        data: [
            {
                name: 'Nguyen Van A',
            },
        ],
    })
}
const getById = async (req, res) => {
    res.send('GET CANDIDATE BY ID')
}

export default {
    getAll,
    getById,
    create,
    update,
    remove,
}
