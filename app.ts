import ParseCasualties, { DataStructure } from './src/ParseCasualties';
import { warDayNumber } from './src/helpers';
import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { config } from 'dotenv';

config();

let parsedData: DataStructure;
let supabase: SupabaseClient;

(async () => {
	parsedData = await ParseCasualties;
	supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_KEY);

	const { day, casualties } = parsedData;

	if (day === warDayNumber) {
		let casualtiesJson = JSON.stringify(casualties);
		const { error } = await supabase.from('ru_casualties').insert({ day, casualties: casualtiesJson });
		if (error) console.log('error', error);
	} else {
		console.log('day is wrong');
		return false;
	}
})();
