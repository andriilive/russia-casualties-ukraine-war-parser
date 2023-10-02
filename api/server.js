// See https://github.com/typicode/json-server#module
// https://github.com/andriilive/jsonserver-vercel-test/tree/main
const jsonServer = require('json-server')
const server = jsonServer.create()
const router = jsonServer.router('db.json')
const middlewares = jsonServer.defaults({
    noCors: true,
    readOnly: !!process.env.VERCEL
})

server.use(middlewares)
// Add this before server.use(router)
server.use(jsonServer.rewriter({
    '/api/*': '/$1',
    "/today": "/days?_sort=id&_order=desc&_limit=1",
    "/latest": "/days?_sort=id&_order=desc&_limit=1"
}))
server.use(router)
server.listen(3000, () => {
    console.log(`JSON Server is running at ${process.env.VERCEL_URL ?? `http://localhost:${process.env.PORT ?? 3000}`}`)
})

// Export the Server API
module.exports = server