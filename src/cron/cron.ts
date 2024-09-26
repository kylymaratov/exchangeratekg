import { ValutaKgModel } from '@/database/schemas/valutakg-schema';
import { parseValutaKgWebsite } from '@/parser';
import cron from 'node-cron';

cron.schedule('*/15 * * * *', async () => {
  try {
    const result = await parseValutaKgWebsite();

    const data = new ValutaKgModel(result);

    await data.save();
  } catch (error) {
    console.log(error);
  }
});
