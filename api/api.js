let {homepage, db, casualtiesKeys, publicApiUri} = require("../utils")

publicUrl = homepage + '/api';

const {Router} = require("express");
const router = Router();

let dayLast = db.get('days').last().value()
let dayBeforeLast = db.get('days').find({id: dayLast.id - 1}).value()

let resp = {
    day: dayLast.id,
}

casualtiesKeys.forEach((key) => {
    resp[key] = [dayLast[key] - dayBeforeLast[key], dayLast[key]]
})

resp._meta = {
    last_updated: new Date(dayLast['created_at']).toISOString().split('T')[0],
    days: [dayLast.id, dayBeforeLast.id],
    last: publicUrl + '/last'
}

router.get("/", (req, res, next) => {
    res.jsonp(resp)
});

module.exports = router;
