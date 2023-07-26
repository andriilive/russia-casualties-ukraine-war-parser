import ParseCasualties, { DataStructure } from './src/ParseCasualties';
import { warDayNumber } from './src/helpers';
import { createClient, PostgrestError, SupabaseClient } from '@supabase/supabase-js';
import { config } from 'dotenv';

// require('json5/lib/register');
// import json5 from 'json5';

// Dummy data
// const dummyRecord : DataStructure = require('./dummyRecord.json5');
// const dummyRecordsArray : DataStructure[] = require('./dummyRecords.json5');
// console.log(dummyRecord, dummyRecordsArray);

config();

let parsedData: DataStructure;
let supabase: SupabaseClient;

async function sendToSupabase(record: DataStructure): Promise<void> {
	const { data, error } = await supabase
		.from('ru_casualties_dev')
		.insert([
			{
				day: record.day,
				...record.casualties,
			},
		])
		.select();

	if (error) console.log('error', error);
	if (data) console.log('data', data);
}

(async () => {
	parsedData = await ParseCasualties;
	supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_KEY);

	if (parsedData.day === warDayNumber) {
		await sendToSupabase(parsedData);
		// let { data: ru_casualties_dev, error } = await supabase.from('ru_casualties_dev').select('*')
	} else {
		console.log('⚠️ day is wrong');
		return false;
	}
})();
