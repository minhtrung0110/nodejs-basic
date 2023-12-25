// Libraries
import express from 'express';
import * as dotenv from 'dotenv';



// Routers
import {
 candidateRouter
} from "./routers/index.js";


dotenv.config()
const app = express();
const port=process.env.PORT


app.use('/candidates',candidateRouter)
app.listen(port??3000,async (req,res)=>{
    console.log(`PORT: ${port}`)
   // res.json('DONE')
})