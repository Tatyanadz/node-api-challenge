const logger = require('./middleware/logger')

const server = require("./api/server")
const port = 4000


server.use(logger('long'))

server.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`)
})

