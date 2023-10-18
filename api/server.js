const jsonServer = require('json-server')
const server = jsonServer.create()
const router = jsonServer.router('db.json')
const api = require("./api");
const {warDayNumber} = require("../utils");

let {publicUrl} = require('../utils')

publicUrl = publicUrl + '/api';

const middlewares = jsonServer.defaults({
    noCors: true,
    readOnly: !!process.env.VERCEL
})

// See https://github.com/typicode/json-server#module
// https://github.com/andriilive/jsonserver-vercel-test/tree/main

server.use('/api', api)

server.use(middlewares)
// Add this before server.use(router)
server.use(jsonServer.rewriter({
    // '/api/*': '/$1',
    "/api/last": "/api/days?_sort=id&_order=desc&_limit=2",
    "/api/today": `/api/days/${warDayNumber}`,
    '/db': '/api/db'
}))

server.use('/api', router)
server.listen(3000, () => {
    console.log(`JSON Server is running at ${process.env.VERCEL_URL ?? `http://localhost:${process.env.PORT ?? 3000}`}`)
})

// Export the Server API
module.exports = server