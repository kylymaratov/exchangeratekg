import { AkchabarKgModel } from '@/database/schemas/akchabarkg-schema';
import { ValutaKgModel } from '@/database/schemas/valutakg-schema';
import { parseAchabarKgWebsite, parseValutaKgWebsite } from '@/parser';
import { serverEmitter } from '@/server/server-emitter';
import AkchabarKgService from '@/services/akchabar-service';
import ValutaKgService from '@/services/valutakg-service';
import cron from 'node-cron';

cron.schedule('*/1 * * * *', async () => {
  try {
    const result = await parseValutaKgWebsite();

    const data = new ValutaKgModel(result);

    await data.save();

    const valutaKgCourses = await new ValutaKgService().getExchange();

    serverEmitter.emit('cron-valuta-kg-exchange', valutaKgCourses);
  } catch (error) {
    console.log(error);
  }
});

cron.schedule('*/1 * * * *', async () => {
  try {
    const result = await parseAchabarKgWebsite();

    const data = new AkchabarKgModel(result);

    await data.save();

    const akchabarkgCourses = await new AkchabarKgService().getExchange();

    serverEmitter.emit('cron-akchabar-kg-exchange', akchabarkgCourses);
  } catch (error) {
    console.log(error);
  }
});
