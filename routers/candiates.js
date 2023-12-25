import express from "express";

const candidateRouter = express.Router()

candidateRouter.get('/', (req, res) => {

    res.send('GET LIST CANDIDATES ');
})

candidateRouter.get('/:id', (req, res) => {
    debugger
    res.send('GET CANDIDATE BY ID');
})


candidateRouter.post('/', (req, res) => {

    res.send('CREATE CANDIDATE SUCCESSFUL')
})

candidateRouter.put('/:id', (req, res) => {

    res.send('UPDATE CANDIDATE');
})

candidateRouter.delete('/:id', (req, res) => {
    res.send('DELETE CANDIDATE');
})

candidateRouter.get('/profile', (req, res) => {
    res.send('GET PROFILE CANDIDATES');
})

candidateRouter.post('/login',(req, res) => {
    console.log('REQUEST LOGIN:',req)
})

candidateRouter.post('/register',(req, res) => {
    res.send('GET SIGNUP');
})
export default candidateRouter