// // Libraries
// import express from 'express'
// import * as dotenv from 'dotenv'
// import connect from './database/database.js'
//
// // Routers
// import { authRoutes, candidateRouter, homeRoutes } from './routers/index.js'
// import checkToken from './authentication/auth.js'
//
// dotenv.config()
//
// // mandatory
//
// const app = express()
// app.use(checkToken)
//
// app.use(express.json())
//
// const port = process.env.PORT ?? 3000
//
// // Router
// app.use('/', homeRoutes)
// app.use('/api/v1/', authRoutes)
// app.use('/api/v1/candidates', candidateRouter)
// connect()
//     .then(() => {
//         app.listen(port, () => {
//             console.log(`Server listening on port ${port}`);
//         });
//     })
//     .catch(error => {
//         console.error('Error connecting to MongoDB:', error.message);
//     });


/* VERSION NOTIFICATION */
// Libraries
import express from 'express'
import * as dotenv from 'dotenv'

// Routers
import { homeRoutes, notificationRoutes } from './routers/index.js'

dotenv.config();

// mandatory
const app = express();

// Middleware for parsing JSON
app.use(express.json());

const port = process.env.PORT ?? 3000;

// Router
app.use('/', homeRoutes);
// app.use('/api/v1/', authRoutes);
// app.use('/api/v1/candidates', candidateRouter);
app.use('/api/v1/notification', notificationRoutes);
// Start the server without connecting to MongoDB
app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});
