import {LOCALISATIONS, LANGUAGES_PROVIDED} from './data.getter.cjs';
const PARSE_TARGET_URL = 'https://www.pravda.com.ua/eng';
const ENUM_CASUALTIES_TYPES = [
	'militaryPersonnel',
	'jet',
	'copter',
	'tank',
	'armoredCombatVehicle',
	'artillerySystem',
	'airDefenceSystem',
	'mlrs',
	'supplyVehicle',
	'ship',
	'uav',
]

const WAR_START_DATE = new Date( '2022-02-24' ).getTime();

// const WAR_DAY_NUMBER = Number( Math.floor( (Date.now() - WAR_START_DATE) / 86400000 ) ); // for the nightly build
const WAR_DAY_NUMBER = Number( Math.floor( (Date.now() - WAR_START_DATE) / 86400000 ) + 1 ); // for prod

const DEBUG_LOG = false;

const {LOCALE_CS, LOCALE_EN, LOCALE_UK, LOCALE_RU} = LOCALISATIONS;

export {
	ENUM_CASUALTIES_TYPES,
	WAR_DAY_NUMBER,
	PARSE_TARGET_URL,
	DEBUG_LOG,
	LOCALE_CS,
	LOCALE_EN,
	LOCALE_RU,
	LOCALE_UK,
	LOCALISATIONS,
	LANGUAGES_PROVIDED
}