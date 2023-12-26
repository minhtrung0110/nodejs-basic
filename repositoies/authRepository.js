import Candidate from '../models/Candidate.js'
import { OutputType } from '../helper/print.js'
import Exception from '../exceptions/Exception.js'
import bcrypt from 'bcrypt'

const login = async ({ email, password }) => {
    try {
        let existingUser = await Candidate.findOne({ email }).exec()
        const isMatched = await bcrypt.compare(password, existingUser.password)
        if (!!isMatch) {
            // create Java Web Token
        } else {
            throw new Exception(Exception.WRONG_EMAIL_OR_PASSWORD)
        }
    } catch (err) {
        throw new Exception(Exception.WRONG_EMAIL_OR_PASSWORD)
    }
    console.log({ email, password })
}
const register = async ({
    email,
    password,
    lastname,
    firstname,
    phoneNumber,
}) => {
    // eslint-disable-next-line no-debugger
    debugger
    let existingUser = await Candidate.findOne({ email }).exec()
    if (!!existingUser) {
        throw new Exception('User already registered', OutputType.ERROR)
    }
    // encrypt password
    const hashPassword = await bcrypt.hash(
        password,
        // eslint-disable-next-line no-undef
        parseInt(process.env.SALT_ROUND)
    )
    // insert database
    const newCandidate = await Candidate.create({
        _id: undefined,
        email,
        password: hashPassword,
        lastname,
        firstname,
        phoneNumber,
        status: 1,
    })
    return {
        ...newCandidate._doc,
        password: 'Not Show',
    }
}

export default {
    login,
    register,
}
