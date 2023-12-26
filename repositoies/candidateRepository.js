import Candidate from '../models/Candidate.js'
import { OutputType } from '../helper/print.js'
import Exception from '../exceptions/Exception.js'
import bcrypt from 'bcrypt'

const getAllCandidates = async ({ data, page, size, searchString }) => {}

const getCandidate = async ({}) => {}
const insert = async (candidate) => {
    try {
        //debugger
        const hashPassword = await bcrypt.hash(
            candidate.password,
            parseInt(process.env.SALT_ROUND)
        )
        return await Candidate.create({
            ...candidate,
            password: hashPassword,
            status: 1,
        })
    } catch (e) {
        //debugger
        throw new Exception('CANNOT_CREATE_CANDIDATE', OutputType.ERROR)
    }
}

const update = async () => {}

const remove = async () => {}

export default {
    getCandidate,
    getAllCandidates,
    insert,
    update,
    remove,
}
