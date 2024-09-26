import { getDate } from './get-date';

export const convertToUnix = (time: string): number => {
  const today = getDate();

  const [hours, minutes] = time.split(':').map(Number);

  today.setHours(hours);
  today.setMinutes(minutes);
  today.setSeconds(0);
  today.setMilliseconds(0);

  return Math.floor(today.getTime() / 1000);
};
