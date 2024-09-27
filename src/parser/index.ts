import { fetchHTMLPage } from './fetch-page';
import { formatAkchabarKgWebsite, formatValutaKgWebsite } from './format-data';

const valutaKgUrl = 'https://valuta.kg/';
const akchabarKgUrl = 'https://www.akchabar.kg/ru/currency-rate';

const parseValutaKgWebsite = async () => {
  const body = await fetchHTMLPage(valutaKgUrl);

  const result = formatValutaKgWebsite(body);

  return result;
};

const parseAchabarKgWebsite = async () => {
  const body = await fetchHTMLPage(akchabarKgUrl);

  const result = formatAkchabarKgWebsite(body);

  return result;
};

export { parseValutaKgWebsite, parseAchabarKgWebsite };
