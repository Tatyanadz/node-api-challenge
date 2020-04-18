const express = require('express')
const helmet = require('helmet')

const projectsRouter = require('../routers/projectsRouter')
const actionsRouter = require('../routers/actionsRouter')

const server = express()


server.use(helmet())
server.use(express.json())

server.use('/api/projects', projectsRouter)
server.use('api/actions', actionsRouter)

server.get('/', (req, res) => {
    console.log(err)
    res.status(500).json({
        message: 'Something went wrong'
    })
})

module.exports = server

