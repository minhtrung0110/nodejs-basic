import HttpStatusCodes from '../exceptions/HttpStatusCode.js'
import jwt from 'jsonwebtoken'

export default function checkToken(req, res, next) {
    // bypass login and register
    // debugger
    if (
        req.url.toLowerCase().trim() === '/api/v1/login' ||
        req.url.toLowerCase().trim() === '/api/v1/register'
    ) {
        next()
        return
    }

    // other requests
    else {
        const token = req?.headers?.authorization?.split(' ')[1]

        try {
            if (!!token) {
                const jwtObject = jwt.verify(token, process.env.JWT_SECRET)
                if (jwtObject.exp * 1000 <= Date.now()) {
                    return res
                        .status(HttpStatusCodes.BAD_REQUEST)
                        .json({ message: 'Token is expired' })
                    res.end()
                } else next()
            } else
                return res
                    .status(HttpStatusCodes.BAD_REQUEST)
                    .json({ message: 'Token is not provide' })
            res.end()
        } catch (err) {
            return res
                .status(HttpStatusCodes.BAD_REQUEST)
                .json({ message: err.toString() })
        }
    }
    //debugger
}
