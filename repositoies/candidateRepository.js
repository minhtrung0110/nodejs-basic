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

const getCandidateById = async (id) => {
    debugger
    const student = await Candidate.findById(id)
    if (!student) throw new Exception('Cannot get candidate', OutputType.ERROR)
    return student
}
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

const update = async (id,candidate) => {
    try {
        const hashPassword = await bcrypt.hash(
            candidate.password,
            parseInt(process.env.SALT_ROUND)
        )
        return await Candidate.findOneAndUpdate({_id: id},{...candidate,password: hashPassword})
    }
    catch (err) {
        throw new Exception('CANNOT_UPDATE_CANDIDATE',OutputType.ERROR)
    }
}

const remove = async (id) => {
    try {
        return await Candidate.deleteOne({_id: id})
    }
    catch (err) {
        throw new Exception('CANNOT_DELETE_CANDIDATE',OutputType.ERROR)
    }
}

export default {
    getCandidateById,
    getAllCandidates,
    insert,
    update,
    remove,
}
