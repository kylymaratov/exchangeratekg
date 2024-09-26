import { ValutaKgModel } from '@/database/schemas/valutakg-schema';
import { calculateUpOrDown } from '@/utils/calc';
import { getDate } from '@/utils/get-date';
import { Router } from 'express';
import { DateTime } from 'luxon';

const valutaKgApi = Router();

valutaKgApi.get('/exchange', async (req, res, next) => {
  try {
    const courses = await ValutaKgModel.find()
      .limit(2)
      .sort({ parsedTime: -1 });

    if (!courses.length) throw new Error('Exchange not found');

    courses[0].data = calculateUpOrDown(courses[1]?.data, courses[0].data);

    res.status(200).json(courses[0]);
  } catch (error) {
    next(error);
  }
});

valutaKgApi.get('/stat', async (req, res, next) => {
  try {
    const { from, to = getDate() } = req.query;

    const courses = await ValutaKgModel.find({
      parsedTime: { $gte: from, $lte: to },
    })
      .limit(1000)
      .sort({ parsedTime: -1 })
      .exec();

    res.status(200).json(courses);
  } catch (error) {
    next(error);
  }
});

export default valutaKgApi;
