import Candidate from '../models/Candidate.js'
import { OutputType } from '../helper/print.js'
import Exception from '../exceptions/Exception.js'
import bcrypt from 'bcrypt'

const getAllCandidates = async ({ page, size, searchString }) => {
    // aggregate data in mongodb
    page = parseInt(page)
    size = parseInt(size)

    // Define the match conditions
    const matchConditions = {
        $or: [
            { firstname: { $regex: new RegExp(searchString, 'i') } },
            { lastname: { $regex: new RegExp(searchString, 'i') } },
            { username: { $regex: new RegExp(searchString, 'i') } },
            { email: { $regex: new RegExp(searchString, 'i') } },
            { address: { $regex: new RegExp(searchString, 'i') } },
        ],
    }

    // Aggregation pipeline for fetching paginated data
    const listCandidates = await Candidate.aggregate([
        {
            $match: matchConditions,
        },
        {
            $skip: (page - 1) * size,
        },
        {
            $limit: size,
        },
    ])

    // Aggregation pipeline for counting total records
    const total_records = await Candidate.countDocuments(matchConditions)

    return {
        data: listCandidates,
        pagination: {
            current_page: page,
            total_page: Math.ceil(total_records / size),
            per_page: size,
            total_records,
        },
    }
}




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
