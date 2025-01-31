// Libraries
import express from 'express'
import * as dotenv from 'dotenv'
import connect from './database/database.js'
import cors from 'cors'
// Routers
import { authRoutes, candidateRouter, homeRoutes } from './routers/index.js'
import checkToken from './authentication/auth.js'
import messageRouter from './routers/messages.js'
import { app, server } from './lib/socket.js'
import userRouter from './routers/users.js'

dotenv.config()

// mandatoryW

// Socket
app.use(checkToken)
app.use(express.json())
app.use(
    cors({
        origin: "http://localhost:5173",
        credentials: true,
    })
);
const port = process.env.PORT ?? 3000

// Router
app.use('/', homeRoutes)
app.use('/api/v1/', authRoutes)
app.use('/api/v1/candidates', candidateRouter)
app.use('/api/v1/users', userRouter)
app.use('/api/v1/messages', messageRouter)

// if (process.env.NODE_ENV === "production") {
//     app.use(express.static(path.join(__dirname, "../frontend/dist")));
//
//     app.get("*", (req, res) => {
//         res.sendFile(path.join(__dirname, "../frontend", "dist", "index.html"));
//     });
// }

connect()
    .then(() => {
        server.listen(port, () => {
            console.log(`Server listening on port ${port}`);
        });
    })
    .catch(error => {
        console.error('Error connecting to MongoDB:', error.message);
    });


