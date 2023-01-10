const LANGUAGES_PROVIDED = ['uk','en','cs','ru'];

const LOCALISATIONS = Object.fromEntries(LANGUAGES_PROVIDED.map(translation => ['LOCALE_' + translation.toUpperCase(), require(`./i18n/${translation}.json`)]));

module.exports = {
	LOCALISATIONS,
	LANGUAGES_PROVIDED
}