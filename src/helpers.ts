export const warStartDate = new Date('2022-02-24').getTime();

export const warDayNumber = Number(Math.floor((Date.now() - warStartDate) / 86400000) + 1); // for prod
// const warDayNumber = Number( Math.floor( (Date.now() - WAR_START_DATE) / 86400000 ) ); // for the nightly build
