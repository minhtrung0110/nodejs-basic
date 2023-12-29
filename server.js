// Libraries
import express from 'express'
import * as dotenv from 'dotenv'
import connect from './database/database.js'

// Routers
import { authRoutes, candidateRouter, homeRoutes } from './routers/index.js'
import checkToken from './authentication/auth.js'
import * as http from 'http'

dotenv.config()

// mandatory

const app = express()
const server = http.createServer(app);
app.use(checkToken)
// allow read body tag of request
app.use(express.json())

// eslint-disable-next-line no-undef
const port = process.env.PORT

// Router
app.use('/',homeRoutes)
app.use('/api/v1/', authRoutes)
app.use('/api/v1/candidates', candidateRouter)
server.listen(port ?? 3000, async (req, res) => {
    var conc = await connect()
    console.log(`PORT: ${port}-${conc}`)
    // res.json('DONE')
})
