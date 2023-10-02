const fs = require('fs');
const html = fs.readFileSync('.snapshot.html', 'utf8')
const cheerio = require('cheerio')
const $ = cheerio.load(html);
const utils = require('./utils');

const casualties = $('.war_num').get().map((el) => {
    return $(el).clone().children().remove().end().text().replace('~', '');
});

let parsedDay = $('.war_title').text().match(/\d+/)[0];
if (parsedDay === utils.warDayNumber && parsedDay > utils.apiData.latest.id) {
    console.log('day seems to be correct')
}

const result = {
    id: utils.warDayNumber,
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
    created_at: new Date(),
}

fetch(`http://localhost:3000/days`, {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
    },
    body: JSON.stringify(result)
}).then(
    response => response.json(
)).then(
    data => console.log(data)
).catch(
    error => console.log(error)
);