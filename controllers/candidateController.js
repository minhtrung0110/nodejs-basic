import HttpStatusCodes from '../exceptions/HttpStatusCode.js'
import { candidateRepository } from '../repositoies/index.js'
import { MAX_RECORD } from '../constants/global_constant.js'
import CandidateRepository from '../repositoies/candidateRepository.js'

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

const update = async (req, res) => {
    debugger
    try {
        const result = await candidateRepository.update(req.params.id,req.body)
        if (!!result)
            return res.status(HttpStatusCodes.CREATED).json({
                message: 'Update candidate successfully',
                data: result,
            })
    } catch (e) {
        //debugger
        return res
            .status(HttpStatusCodes.BAD_REQUEST)
            .json({ message: 'Cannot update candidate' })
    }
}

const remove = async (req, res) => {
    debugger
    try {
        const result = await candidateRepository.remove(req.params.id)
        if (!!result)
            return res.status(HttpStatusCodes.CREATED).json({
                message: 'Delete candidate successfully',
                data: [],
            })
    } catch (e) {
        //debugger
        return res
            .status(HttpStatusCodes.BAD_REQUEST)
            .json({ message: 'Cannot delete candidate' })
    }
}
const getAll = async (req, res) => {
    try {
        let { page = 1, size = MAX_RECORD, searchString = '' } = req.query

        const result = await candidateRepository.getAllCandidates({
            page,
            size,
            searchString,
        })
        res.status(HttpStatusCodes.OK).json({
            message: 'Get All Candidates Successfully',
            ...result,
        })
    } catch (err) {
        res.status(HttpStatusCodes.BAD_REQUEST).json({
            message: `Get All Candidates Fail ${err.toString()}`,
            data: [],
        })
    }
}
const getById = async (req, res) => {

    try {
        const id=req.params.id
        console.log('ID:', id)
        if (id.match(/^[0-9a-fA-F]{24}$/)) {
            const candidate = await CandidateRepository.getCandidateById(id)
            return res.status(HttpStatusCodes.OK).json({
                message: 'Get Candidate Successfully',
                data: candidate,
            })
        }

    } catch (err) {
        return res
            .status(HttpStatusCodes.BAD_REQUEST)
            .json({ message: 'Canot get detail candidate !' })
    }
}

export default {
    getAll,
    getById,
    create,
    update,
    remove,
}
