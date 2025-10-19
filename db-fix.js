const {db, warStartDate, warDayNumber} = require('./utils');

async function fetchDay(dayId) {

  let fullDate = new Date(warStartDate);
  fullDate.setDate(fullDate.getDate() + dayId - 1);

  // format date to yyyy-mm-dd
  let date = fullDate.toISOString().split('T')[0];
  const fetchUrl = `https://russianwarship.rip/api/v2/statistics/${date}`;
  let dayData = null;

  try {
    const fetchDay = await fetch(fetchUrl);
    const res = await fetchDay.json();
    console.log(res);
    if (res && res) {
      const stats = res.data.stats;
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
      }
    }
    else {
      console.error('No stats found for day #' + dayId + ' (' + date + ')');
      dayData = null;
      return null;
    }
  }
  catch (error) {
    console.error('Error fetching data for day #' + dayId + ' (' + date + '): ', error);
    dayData = null;
    return null;
  }
  return dayData;
}

(async function main() {
  try {
    const firstDayId = db.get('days').first().value().id;
    const lastDayId = db.get('days').last().value().id;
    const currentDayId = warDayNumber;

    let dayId = lastDayId - 1;
    while (dayId > firstDayId) {

      const dayExists = db.get('days').find({id: dayId}).value();
      if (!dayExists) {

        console.warn('Day #' + dayId + ' is missing. Fetching and adding to the database...');

        if (dayId === 3) {
          console.log('Skipping day #3 due to known data issues.');
          dayId--;
          continue;
        }

        try {
          const dayData = await fetchDay(dayId);
          if (dayData) {
            db.get('days').push(dayData).write();
            console.log('Day #' + dayId + ' added successfully.');
          }
          else {
            console.error('Failed to fetch data for day #' + dayId + '.');
          }
        }
        catch (error) {
          console.error('Error processing day #' + dayId + ': ', error);
        }

      }
      dayId--;
    }
    if (dayId === currentDayId) {
      console.log('All gaps filled from day #' + (lastDayId + 1) + ' to today #' + currentDayId);
    }
  }
  catch (error) {
    console.error(error);
    process.exit(1);
  }
})();
