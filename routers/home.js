import express from 'express'
import HttpStatusCode from '../exceptions/HttpStatusCode.js'

const homeRoutes = express.Router()

homeRoutes.get(
    '/',
    (req, res) => {
        console.log('Testing',req)
        res.status(HttpStatusCode.OK).json({
            message:'Hello. Welcome to visit Notification Real time for Tanngo',
            license:'NGUYEN DUC MINH TRUNG - MIT License',
            version:'1.0.1'
        })
    }
)


export default homeRoutes
