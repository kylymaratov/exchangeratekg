import { BankData } from '@/parser/format-data';
import { getDate } from '@/utils/get-date';
import { model, Schema } from 'mongoose';

const AkchabarKgShema = new Schema<{ parsedTime: Date; data: BankData[] }>({
  data: Array,
  parsedTime: Number,
});

export const AkchabarKgModel = model('akchabarkg', AkchabarKgShema);
