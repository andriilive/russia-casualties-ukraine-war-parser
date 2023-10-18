const fs = require('fs');
const html = fs.readFileSync('.snapshot.html', 'utf8')
const cheerio = require('cheerio')
const {getDaysIds, router, db, warDayNumber, getTheDay, putToday} = require("./utils");
const $ = cheerio.load(html);

const casualties = $('.war_num').get().map((el) => {
    return Number( $(el).clone().children().remove().end().text().replace('~', '') );
});

let parsedDay = $('.war_title').text().match(/\d+/)[0];

let parsedResult = {
    id: Number(parsedDay),
    militaryPersonnel: casualties[0],
    jet: casualties[1],
    copter: casualties[2],
    tank: casualties[3],
    armoredCombatVehicle: casualties[4],
    artillerySystem: casualties[5],
    airDefenceSystem: casualties[6],
    mlrs: casualties[7],
    supplyVehicle: casualties[8],
    ship: casualties[9],
    uav: casualties[10],
    created_at: new Date().toISOString()
}

console.log('scrap.js result: ', parsedResult);

if ( db.get('days').find({id: parsedResult.id}).value() ) {
    console.log('scrap.js: day already exists');
} else {
    console.log('scrap.js: day does not exist');
    db.get('days').push(parsedResult).write()
}

module.exports = parsedResult;
