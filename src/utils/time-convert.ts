import { getDate } from './get-date';

export const convertToUnix = (time: string): number => {
  const today = getDate();

  const [hours, minutes] = time.split(':').map(Number);

  today.set({
    hour: hours,
    minute: minutes,
    second: 0,
    millisecond: 0,
  });

  return today.unix();
};
