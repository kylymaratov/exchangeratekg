import { AkchabarKgModel } from '@/database/schemas/akchabarkg-schema';
import { calculateUpOrDown } from '@/utils/calc';

export class AkchabarKgService {
  async getExchange() {
    const courses = await AkchabarKgModel.find()
      .limit(2)
      .sort({ parsedTime: -1 });

    if (!courses.length) throw new Error('Exchange not found');

    courses[0].data = calculateUpOrDown(courses[1]?.data, courses[0].data);

    return courses[0];
  }
}

export default AkchabarKgService;
