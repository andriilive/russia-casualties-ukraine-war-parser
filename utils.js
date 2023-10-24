const jsonServer = require("json-server");
const warStartDate = new Date('2022-02-24').getTime()
const warDayNumber = Number(Math.floor((Date.now() - warStartDate) / 86400000) + 1);
const router = jsonServer.router('db.json')
const packageJson = require('./package.json')
const {homepage} = packageJson

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
    const result = await router.db.get('days').push( dataRaw ).write()
    console.log('result', result)
    return result
}

const publicUrl = 'https://' + process.env.VERCEL_URL ?? `http://localhost:${process.env.PORT ?? 3000}`
const staticApiUri = (url) => `${process.env.VERCEL_URL ?? 'http://localhost:3000'}/json-api/${url}.json`;
const publicApiUri = (url) => `${process.env.VERCEL_URL ?? 'http://localhost:3000'}/api/${url}`;

const db = router.db;

const casualtiesKeys = ["militaryPersonnel", "jet", "copter", "tank", "armoredCombatVehicle", "artillerySystem", "airDefenceSystem", "mlrs", "supplyVehicle", "ship", "uav"];

module.exports = {
    warStartDate, warDayNumber, getDaysIds, getLastDay, getTheDay,putToday, publicUrl, db, staticApiUri, casualtiesKeys, publicApiUri, homepage
}
