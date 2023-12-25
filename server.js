// Libraries
import express from 'express';
import * as dotenv from 'dotenv';



// Routers
import {
    authRoutes,
    candidateRouter
} from "./routers/index.js";

// mandatory
dotenv.config()
const app = express();
// allow read body tag of request
app.use(express.json())

const port=process.env.PORT

// Router
app.use('/',authRoutes)
app.use('/candidates',candidateRouter)
app.listen(port??3000,async (req,res)=>{
    console.log(`PORT: ${port}`)
   // res.json('DONE')
})