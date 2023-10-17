const fs = require('fs');
const html = fs.readFileSync('.snapshot.html', 'utf8')
const cheerio = require('cheerio')
const $ = cheerio.load(html);

const casualties = $('.war_num').get().map((el) => {
    return Number( $(el).clone().children().remove().end().text().replace('~', '') );
});

let parsedDay = $('.war_title').text().match(/\d+/)[0];

let parsedResult = {
    parsedDay: Number(parsedDay),
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
    uav: casualties[10]
}

console.log('scrap.js result: ', parsedResult);

module.exports = parsedResult;
