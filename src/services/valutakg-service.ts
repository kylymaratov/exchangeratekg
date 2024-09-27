import { ValutaKgModel } from '@/database/schemas/valutakg-schema';
import { calculateUpOrDown } from '@/utils/calc';

export class ValutaKgService {
  async getExchange() {
    const courses = await ValutaKgModel.find()
      .limit(2)
      .sort({ parsedTime: -1 });

    if (!courses.length) throw new Error('Exchange not found');

    courses[0].data = calculateUpOrDown(courses[1]?.data, courses[0].data);

    return courses[0];
  }
}

export default ValutaKgService;
