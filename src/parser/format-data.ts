import * as cheerio from 'cheerio';
import { BANKS_NAMES } from '@/constants/constants';
import { convertToUnix } from '@/utils/time-convert';
import { getDate } from '@/utils/get-date';
import { transliterate } from '@/utils/transliterate';

type Valuta = 'usd' | 'eur' | 'rub' | 'kzt' | 'cny' | 'gbp';

interface BankCourse {
  buy: string;
  sell: string;
  valuta: Valuta;
  direction?: 'up' | 'down';
  procent?: string;
}

export interface BankData {
  name: string;
  bankId: string;
  courses: BankCourse[];
  time: number | null;
}

export const formatValutaKgWebsite = (
  body: any,
): { data: BankData[]; parsedTime: number } => {
  const $ = cheerio.load(body);
  const result: BankData[] = [];

  for (let i = 0; i < BANKS_NAMES.length; i++) {
    const bank = $(`tr#js-member-${BANKS_NAMES[i]}`);

    if (!bank.length) continue;

    const bankTitle = bank.find('a').text().trim();
    const courses: string[] = [];
    let time: number | null = null;

    try {
      const findedTime = bank.find('span.text-success').text().trim();

      if (findedTime) {
        time = convertToUnix(findedTime);
      }
    } catch (error) {
      time = null;
    }

    bank.find('.td-rate__wrp').each((_, el) => {
      const course = $(el).text().trim().replace(/\s+/g, '');

      if (parseFloat(course)) courses.push(course);
    });

    result.push({
      name: bankTitle,
      bankId: BANKS_NAMES[i],
      courses: [
        { buy: courses[0], sell: courses[1], valuta: 'usd' },
        { buy: courses[2], sell: courses[3], valuta: 'eur' },
        { buy: courses[4], sell: courses[5], valuta: 'rub' },
        { buy: courses[6], sell: courses[7], valuta: 'kzt' },
      ],
      time,
    });
  }
  return {
    data: result,
    parsedTime: getDate().unix(),
  };
};

export const formatAkchabarKgWebsite = (
  body: any,
): { data: BankData[]; parsedTime: number } => {
  const $ = cheerio.load(body);
  const result: BankData[] = [];

  $('.TableSort_table__GshZK > tbody > tr').each((idx, row) => {
    let courses: string[] = [];
    const name = $(row).find('td:nth-child(1)').text();
    const bankId = transliterate(name);

    $(row)
      .find('td')
      .each((i, cell) => {
        if (i === 0) return;

        const course = $(cell).text();

        if (parseFloat(course)) courses.push(course);
      });

    result.push({
      name,
      bankId,
      courses: [
        { buy: courses[0], sell: courses[1], valuta: 'usd' },
        { buy: courses[2], sell: courses[3], valuta: 'eur' },
        { buy: courses[4], sell: courses[5], valuta: 'rub' },
        { buy: courses[6], sell: courses[7], valuta: 'kzt' },
      ],
      time: null,
    });
  });

  return { data: result, parsedTime: getDate().unix() };
};
