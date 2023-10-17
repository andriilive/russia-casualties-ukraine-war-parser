const jsonServer = require("json-server");
const warStartDate = new Date('2022-02-24').getTime()
const warDayNumber = Number(Math.floor((Date.now() - warStartDate) / 86400000) + 1);
const router = jsonServer.router('db.json')

const getTheDay = async (id) => {
    const day = await router.db.get('days').find({id}).value()
    console.log('day', day ?? 'no day')
    return day
}
const getLastDay = async () => {
    const lastDay = await router.db.get('days').last().value()
    console.log('lastDay', lastDay)
    return lastDay
}

const getDaysIds = async () => {
    const daysIds = await router.db.get('days').map('id').value()
    console.log('daysIds', daysIds)
    return daysIds
}

const putToday = async function (dataRaw) {
    const data = {
        id: warDayNumber, ...dataRaw, createdAt: new Date().toISOString(),
    };
    await router.db.get('days').push( data ).write()
    return data
}

module.exports = {
    warStartDate, warDayNumber, getDaysIds, getLastDay, getTheDay,putToday
}