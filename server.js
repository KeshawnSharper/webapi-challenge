const server = require('./index');
const actionRouter = require('./actionRouter')
server.listen(4001, () => console.log("server is listening"))
server.use('/api/actions', actionRouter)