import express from 'express'
import HttpStatusCode from '../exceptions/HttpStatusCode.js'

const homeRoutes = express.Router()

homeRoutes.get(
    '/',
    (req, res) => {
        res.status(HttpStatusCode.OK).json({
            message:'Hello. Welcome to visit nodejs-basic server ',
            license:'NGUYEN DUC MINH TRUNG - MIT License',
            github:'https://github.com/minhtrung0110/nodejs-basic.git',
            version:'1.0.0'
        })
    }
)


export default homeRoutes
