const {db, warStartDate, warDayNumber} = require('./utils');

async function fetchDay(dayId) {

  let fullDate = new Date(warStartDate);
  fullDate.setDate(fullDate.getDate() + dayId - 1);

  // format date to yyyy-mm-dd
  let date = fullDate.toISOString().split('T')[0];
  const fetchUrl = `https://russianwarship.rip/api/v2/statistics/${date}`;
  let dayData;

  try {
    const res = await fetch(fetchUrl);
    const {stats} = (await res.json()).data;
    dayData = {
      id: dayId,
      "militaryPersonnel": stats['personnel_units'],
      "jet": stats['planes'],
      "copter": stats['helicopters'],
      "tank": stats['tanks'],
      "armoredCombatVehicle": stats['armoured_fighting_vehicles'],
      "artillerySystem": stats['artillery_systems'],
      "airDefenceSystem": stats['aa_warfare_systems'],
      "mlrs": stats['mlrs'],
      "supplyVehicle": stats['vehicles_fuel_tanks'],
      "ship": stats['warships_cutters'],
      "uav": stats['uav_systems'],
      // "date": date, // 2023-12-26
      "created_at": new Date(date).toISOString(),
    };
  } catch (error) {
    console.error(`Error fetching day #${dayId} at ${fetchUrl}:`, error);
    process.exit(1);
    throw error;
  }
  return dayData;
}

(async function main() {
  try {
    const lastDayId = db.get('days').last().value().id;
    const currentDayId = warDayNumber;

    if (lastDayId >= currentDayId) {
      console.log('No gaps to fill. Last day ID in DB:', lastDayId, 'Current day ID:', currentDayId);
      process.exit(0);
      return;
    }

    let dayI = lastDayId + 1;
    while (dayI <= currentDayId) {
      const dayExists = db.get('days').find({id: dayI}).value();
      if (dayExists) {
        console.log(`fill-gaps.js: day #${dayI} exists in db.json`);
        dayI++;
        continue;
      }

      const dayData = await fetchDay(dayI);
      if (dayData) {
        await db.get('days').push(dayData).write();
        console.log(`fill-gaps.js: added day #${dayI} to db.json`);
      }
      dayI++;
    }
    if (dayI === currentDayId) {
      console.log('All gaps filled from day #'+(lastDayId + 1)+' to today #'+currentDayId);
    }
  }
  catch (error) {
    console.error(error);
    process.exit(1);
  }
})();
