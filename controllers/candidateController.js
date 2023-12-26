import HttpStatusCodes from '../exceptions/HttpStatusCode.js'

const create = async (req, res) => {}

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
