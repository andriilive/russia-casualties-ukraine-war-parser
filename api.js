// See https://github.com/typicode/json-server#module
const jsonServer = require('json-server')
const api = jsonServer.create()
const router = jsonServer.router('db.json')
const middlewares = jsonServer.defaults(
    {
        noCors: true,
    }
)


api.use(middlewares)
// Add this before api.use(router)
// api.use(jsonServer.rewriter({
//     '/api/*': '/$1',
//     '/latest': '/days?_sort=id&_order=desc&_limit=1',
// }))
api.use(router)

api.listen(3000, () => {
    console.log('JSON Server is running')
})

// Export the Server API
module.exports = api