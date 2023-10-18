let {getLastDay, publicUrl, putToday, warDayNumber} = require("../utils")

publicUrl = publicUrl + '/api';

const {Router} = require("express");
const router = Router();

router.get("/", (req, res, next) => {
    res.jsonp({
        'day': warDayNumber, 'today': `${publicUrl}/today`, 'days': {
            'all': `${publicUrl}/days`,
            'array': `${publicUrl}/days/array`,
            'last': `${publicUrl}/days/last`,
            'index': `${publicUrl}/days/index`,
        }, 'i18n': {
            'all': `${publicUrl}/i18n`,
            'ua': `${publicUrl}/i18n/ua`,
            'ru': `${publicUrl}/i18n/ru`,
            'en': `${publicUrl}/i18n/en`,
            'cs': `${publicUrl}/i18n/cs`,
        }
    })
});

module.exports = router;