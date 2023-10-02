const warStartDate = new Date('2022-02-24').getTime()
const days = require("./db.json").days;
const latest = days.slice(-1)[0];
const warDayNumber = Number(Math.floor((Date.now() - warStartDate) / 86400000) + 1);

module.exports = {
    warStartDate,
    warDayNumber,
    apiData: {latest, days}
}