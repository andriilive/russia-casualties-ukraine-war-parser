// Puppeteer page https://pptr.dev/api/puppeteer.page
// Crawlee Puppeteer https://crawlee.dev/api/puppeteer-crawler
// Crawlee single page example https://crawlee.dev/docs/examples/crawl-single-url

import { CriticalError, Dataset, PuppeteerCrawler, log, LogLevel } from 'crawlee'
import { DEBUG_LOG, ENUM_CASUALTIES_TYPES, PARSE_TARGET_URL, WAR_DAY_NUMBER as WAR_DAY_NUMBER_EXPECTED } from './data.js'

// Create a single supabase client for interacting with your database
//const supabase = createClient('https://app.supabase.com/project/mjixpczxppekdjvrzjat',
// 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1qaXhwY3p4cHBla2RqdnJ6amF0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2NzMzMzY2MDUsImV4cCI6MTk4ODkxMjYwNX0.__41cKMyA5hyfAtrpyYstaA0bnET5Sb5rEmUYpHKaR4')

log.setLevel(DEBUG_LOG ? LogLevel.DEBUG : LogLevel.INFO);

log.info(`crawler.js started at ${new Date().toLocaleString('cs-CZ')} with DEBUG_LOG ${ DEBUG_LOG ? 'enabled' : 'disabled' }`)

const crawler = new PuppeteerCrawler( {
	async requestHandler( { log, page } ) {
		
		function checkAndDie (condition, dieMsg) {
			if ( condition ) {
				log.error( dieMsg )
				throw new CriticalError();
			}
		}
		
		let parsedData = {
			elementContent: await page.$eval(
				'.war_block',
				( $el ) => $el.textContent.replace( /\n\s+/g, ' ' ).trim().toString(),
			),
			casualtiesNumbers: await page.$$eval(
				'.war_num',
				( $els ) => $els.map( ( $el ) => Number( $el.textContent.replace( '~', '' ).split( '+' )[0] + 1 ) ),
			),
			warDayNumber: await page.$eval(
				'.war_title',
				( $el ) => Number( $el.textContent.slice( -3 ) ),
			)
		};
		
		const crawlerResult = {
			id: parsedData.warDayNumber,
			casualties: Object.fromEntries(
				ENUM_CASUALTIES_TYPES.map( ( casualtiesType, index ) => [ casualtiesType, parsedData.casualtiesNumbers[index] ] ),
			)
		}
		
		log.info('👍 Crawled the data from page', {blockContent: parsedData.elementContent});
		
		checkAndDie(parsedData.warDayNumber !== WAR_DAY_NUMBER_EXPECTED, '⚠️ The casualties counter seems was outdated. The scripts need your attention')
		
		log.info('👍 Passed the check, parsed warDayNumber fits expected', {warDayExpected: WAR_DAY_NUMBER_EXPECTED, parsedWarDayNumber: parsedData.warDayNumber});
		
		// Save to storage
		const dataset = await Dataset.open();
		await dataset.pushData(crawlerResult);
		let datasetKey = 'default';
		
		const storageData = await Dataset.getData();
		
		let infoMsg = `⬇️ Stored the result in ${datasetKey} local dataset`
		log.info(infoMsg, {crawlerResult : crawlerResult, storageData});
		
		// Save to supabase
		// const { error } = await supabase.from('days').insert(crawlerResult)
		// log.error('error', error)
	},
	
	failedRequestHandler( { log, response } ) {
		log.error( '⚠️ Crawl failed. The scripts need your attention', { response } )
	},
} )

await crawler.run( [ PARSE_TARGET_URL ] )

