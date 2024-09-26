import { fetchHTMLPage } from './fetch-page';
import { formatValutaKgWebsite } from './format-data';

const valutaKgUrl = 'https://valuta.kg/';

const parseValutaKgWebsite = async () => {
  const body = await fetchHTMLPage(valutaKgUrl);

  const result = await formatValutaKgWebsite(body);

  return result;
};

export { parseValutaKgWebsite };
