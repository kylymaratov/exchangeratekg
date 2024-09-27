import { BankData } from '@/parser/format-data';

export const calculateUpOrDown = (
  oldCourse: BankData[],
  course: BankData[],
): BankData[] => {
  if (!oldCourse) return course;

  for (let i = 0; i < oldCourse.length; i++) {
    for (let j = 0; j < oldCourse[i].courses.length; j++) {
      const oldBuy = parseFloat(oldCourse[i].courses[j].buy);
      const oldSell = parseFloat(oldCourse[i].courses[j].sell);
      const buy = parseFloat(course[i].courses[j].buy);
      const sell = parseFloat(course[i].courses[j].sell);

      const oldTotal = oldBuy + oldSell;
      const newTotal = buy + sell;

      const totalPercentageChange = ((newTotal - oldTotal) / oldTotal) * 100;

      if (newTotal > oldTotal) {
        course[i].courses[j].direction = 'up';
        course[i].courses[j].procent = `+${totalPercentageChange.toFixed(2)}%`;
      }

      if (newTotal < oldTotal) {
        course[i].courses[j].direction = 'down';
        course[i].courses[j].procent = `-${totalPercentageChange.toFixed(2)}%`;
      }
    }
  }

  return course;
};
