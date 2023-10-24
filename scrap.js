const fs = require('fs');
const html = fs.readFileSync('.snapshot.html', 'utf8')
const cheerio = require('cheerio')
const {getDaysIds, router, db, warDayNumber, getTheDay, putToday, casualtiesKeys} = require("./utils");
const $ = cheerio.load(html);

const casualties = $('.war_num').get().map((el) => {
    return Number( $(el).clone().children().remove().end().text().replace('~', '') );
});

let parsedDay = $('.war_title').text().match(/\d+/)[0];

let parsedResult = {
    id: Number(parsedDay)
}

casualtiesKeys.forEach((key, index) => {
    parsedResult[key] = casualties[index];
});

parsedResult['created_at'] = new Date().toISOString();

console.log('scrap.js result: ', parsedResult);

if ( db.get('days').find({id: parsedResult.id}).value() ) {
    console.log('scrap.js: day already exists');
} else {
    console.log('scrap.js: day does not exist');
    db.get('days').push(parsedResult).write()
}

module.exports = parsedResult;
