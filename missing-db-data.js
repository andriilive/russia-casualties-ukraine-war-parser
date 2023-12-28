const {db, warStartDate, warDayNumber} = require('./utils');

// Fetch and populate missing days into db.json

let missing = [];

function skipCheckMissing( idRanges = [
    [2, 439],
    [626, 671]
] ) {
    let lastId = db.get('days').last().value().id;
    console.log(`firstId 2, lastExpectedID: ${warDayNumber}, lastId: ${lastId}`);

    for (const [start, end] of idRanges) {
        for (let i = start; i <= end; i++) {
            if ( !db.get('days').find({ id: i } ).value() ) {
                missing.push(i);
            }
        }
    }

    console.log(`Missing ${missing.length} posts, ID's:`, missing);

    return (missing.length === 0 || missing.length === 1);
}

async function fetchDay(dayId) {

    let fullDate = new Date(warStartDate);
    fullDate.setDate(fullDate.getDate() + dayId - 1);

    // format date to yyyy-mm-dd
    // const date = new Date(warStartDate);
    // date.setDate(date.getDate() + i - 2);
    let date = fullDate.toISOString().split('T')[0];

    const fetchUrl = `https://russianwarship.rip/api/v2/statistics/${date}`;

    const res = await fetch( fetchUrl );

    if (res.status !== 200) {
        console.log(`fetching day #${dayId} at ${fetchUrl} failed with status ${res.status}`);
        return null;
    } else {
        const {data} = await res.json();
        const {stats, increase} = data;

        const dayData = {
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
            "created_at": new Date( date ).toISOString(),
        };

        if ( db.get('days').find({ id: dayId } ).value() ) {
            console.log(`fill-gaps.js: day #${dayId} exists in db.json`);
        } else {
            console.log(`fill-gaps.js: no day #${dayId} in db.json`);
            await db.get('days').push(dayData).write()
        }

        return dayData;
    }
}

if (skipCheckMissing()) {
    console.log('No need to feel gaps, skipping');
    process.exit(0);
    return;
} else {
    (async () => {

        let dayId = 671;
        let dayIds = []

        for (let i = 2; i <= 439; i++) {
            dayIds.push(i);
        }

        for (let i = 626; i <= 670; i++) {
            dayIds.push(i);
        }

        dayIds.push(dayId);

        for (const dayId1 of dayIds) {
            await fetchDay(dayId1);
        }

        // Promise all writes results to db in random order 🤷🏻
        // const fetched = await Promise.all(dayIds.map(fetchDay));

        // console.log(fetched);

        // db.get('days').push(...fetched).write();

        // if ( db.get('days').find({ id: dayId } ).value() ) {
        //     console.log(`fill-gaps.js: day #${dayId} exists in db.json`);
        // } else {
        //     console.log(`fill-gaps.js: no day #${dayId} in db.json`);
        //     db.get('days').push(dayData).write();
        // }

    })();
}