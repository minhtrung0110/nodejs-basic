import mongoose from 'mongoose'
import { OutputType, print } from '../helper/print.js'
import Exception from '../exceptions/Exception.js'

mongoose.set('strictQuery', true)
const connect = async () => {
    try {
        let connection = await mongoose.connect(process.env.MONGO_URI)
        print('Connect mongoose successfully', OutputType.SUCCESS)
        return connection
    } catch (e) {
        if (e.code === 8000) {
            throw new Exception(Exception.WRONG_DB_USERNAME_PASSWORD)
        } else if (e.code === 'NOTFOUND') {
            throw new Exception(Exception.WRONG_SERVER_NAME_CONNECT_STRING)
        }
        throw new Exception(Exception.CANNOT_CONNECT_TO_MONGOOSE)
        //debugger
    }
}

export default connect
