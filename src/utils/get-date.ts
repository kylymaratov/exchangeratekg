import moment from 'moment-timezone';

const bishkekTimeZone = 'Asia/Bishkek';

export const getDate = () => moment.tz(bishkekTimeZone);
