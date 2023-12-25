import express from "express";
import {body, validationResult} from "express-validator";

const authRoutes = express.Router();

authRoutes.post('/login',
    body('email').isEmail(),
    body('password').isLength({min: 5}),
    (req, res) => {
    const errors=validationResult(req)
    if (!errors.isEmpty()){
        return res.status(400).json({errors: errors.array()})
    }
    const {email, password} = req?.body
        res.send('Login successful')
    })
authRoutes.post('/register', (req, res) => {

})

export default authRoutes