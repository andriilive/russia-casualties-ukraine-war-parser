// See https://github.com/typicode/json-server#module
// https://github.com/andriilive/jsonserver-vercel-test/tree/main

const jsonServer = require('json-server')
const {getDaysIds, getLastDay, warDayNumber, warStartDate, getTheDay, resolveToday, dayDbEntryMap, putToday} = require("../utils");
const server = jsonServer.create()
const router = jsonServer.router('db.json')
const parsedData = require('./../scrap')
const middlewares = jsonServer.defaults({
    noCors: true,
    readOnly: !!process.env.VERCEL
})

const publicUrl = process.env.VERCEL_URL ?? `http://localhost:${process.env.PORT ?? 3000}`

server.get('/days/array', async (req, res) => {
    const daysIds = await getDaysIds()
    res.jsonp(daysIds)
})

server.get('/days/last', async (req, res) => {
    const lastDay = await getLastDay()
    res.jsonp(lastDay)
})

server.get('/days/index', async (req, res) => {
    const daysIds = await getDaysIds()
    const days = daysIds.map(id => {
        return {
            id,
            url: `${publicUrl}/days/${id}`
        }
    })
    res.jsonp(days)
})

server.get('/today', async (req, res) => {
    const lastDay = await getLastDay();
    if (lastDay['id'] === warDayNumber) {
        res.jsonp(lastDay)
    } else {
        const {parsedDay, ...parsed} = parsedData
        if (parsedDay === warDayNumber) {
            console.log('parsedDay === warDayNumber', parsedDay, warDayNumber)
            const data = await putToday(parsed);
            res.jsonp(data)
        } else {
            throw new Error('parsedDay !== warDayNumber')
        }
    }
})

server.get('/api', (req, res) => {
    res.jsonp({
        'day' : warDayNumber,
        'today': `${publicUrl}/today`,
        'days': {
            'all': `${publicUrl}/days`,
            'array': `${publicUrl}/days/array`,
            'last': `${publicUrl}/days/last`,
            'index': `${publicUrl}/days/index`,
        },
        'i18n': {
            'ua': `${publicUrl}/i18n/ua`,
            'ru': `${publicUrl}/i18n/ru`,
            'en': `${publicUrl}/i18n/en`,
            'cs': `${publicUrl}/i18n/cs`,
        }
    })
})

server.use(middlewares)
// Add this before server.use(router)
server.use(jsonServer.rewriter({
    // '/api/*': '/$1',
    "/week": "/days?_sort=id&_order=desc&_limit=7",
    // "/today": `/days/${warDayNumber}`,
}))

server.use(router)
server.listen(3000, () => {
    console.log(`JSON Server is running at ${process.env.VERCEL_URL ?? `http://localhost:${process.env.PORT ?? 3000}`}`)
})

// Export the Server API
module.exports = server