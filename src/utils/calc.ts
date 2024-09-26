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

      if (!oldBuy || !oldSell || !buy || !sell) continue;

      if (buy > oldBuy && sell > oldSell) {
        course[i].courses[j].direction = 'up';
      }

      if (oldBuy > buy && oldSell > sell) {
        course[i].courses[j].direction = 'down';
      }
    }
  }

  return course;
};
