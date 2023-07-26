import puppeteer from 'puppeteer';

// Parse today's Russian army losses // Puppeteer docs: https://pptr.dev/api/puppeteer.page
const parseUrl: string = 'https://www.pravda.com.ua/eng';

const ParseCasualties = (async (): Promise<DataStructure> => {
	const browser = await puppeteer.launch({ headless: 'new' });
	const page = await browser.newPage();

	await page.goto(`${parseUrl}`);
	await page.setViewport({ width: 320, height: 480 });

	const warBlock: string = '.war_block';
	await page.waitForSelector(warBlock);

	const parsedData = {
		day: await page.$eval('.war_title', ($el) => Number($el.textContent.slice(-3))),
		casualties: mapCasualties(
			await page.$$eval('.war_num', ($els) =>
				$els.map(($el) => Number($el.textContent.replace('~', '').split('+')[0])),
			),
		),
	};

	await browser.close();

	return parsedData;
})();

enum CasualtiesEnum {
	militaryPersonnel,
	jet,
	copter,
	tank,
	armoredCombatVehicle,
	artillerySystem,
	airDefenceSystem,
	mlrs,
	supplyVehicle,
	ship,
	uav,
}

export type CasualtiesType = Required<Record<keyof typeof CasualtiesEnum, number>>;

export type DataStructure = {
	day: number;
	casualties: CasualtiesType;
};

export default ParseCasualties;

function mapCasualties(warCasualties: number[]): CasualtiesType {
	let response: CasualtiesType = {
		militaryPersonnel: 0,
		jet: 0,
		copter: 0,
		tank: 0,
		armoredCombatVehicle: 0,
		artillerySystem: 0,
		airDefenceSystem: 0,
		mlrs: 0,
		supplyVehicle: 0,
		ship: 0,
		uav: 0,
	};

	warCasualties.forEach((casualty, index) => {
		response[CasualtiesEnum[index]] = casualty;
	});

	return response;
}
