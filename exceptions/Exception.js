import { OutputType, print } from '../helper/print.js'

export default class Exception extends Error {
    static WRONG_DB_USERNAME_PASSWORD = 'WRONG_DB_USERNAME_PASSWORD'
    static WRONG_SERVER_NAME_CONNECT_STRING = 'WRONG_SERVER_NAME_CONNECT_STRING'
    static CANNOT_CONNECT_TO_MONGOOSE = 'CANNOT_CONNECT_TO_MONGOOSE'
    static CANNOT_CREATE_CANDIDATE = 'CANNOT_CREATE_CANDIDATE'
    static WRONG_EMAIL_OR_PASSWORD = 'WRONG_EMAIL_OR_PASSWORD'

    constructor(message) {
        super(message)
        print(message, OutputType.ERROR)
    }
}
