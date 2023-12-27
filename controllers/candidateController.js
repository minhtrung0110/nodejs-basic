import HttpStatusCodes from '../exceptions/HttpStatusCode.js'
import { candidateRepository } from '../repositoies/index.js'
import { MAX_RECORD } from '../constants/global_constant.js'

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
   try{
       let {page=1,size=MAX_RECORD,searchString=''}=req.query

       const result=await candidateRepository.getAllCandidates({
           page,size,searchString
       })
       res.status(HttpStatusCodes.OK).json({
           message: 'Get All Candidates Successfully',
           ...result
       })
   }
   catch (err){
       res.status(HttpStatusCodes.BAD_REQUEST).json({
           message: `Get All Candidates Fail ${err.toString()}`,
           data: []
       })
   }
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
