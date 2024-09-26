import mongoose, { MongooseOptions } from 'mongoose';

export const connectionDatabase = async (
  url: string,
  params: MongooseOptions,
) => await mongoose.connect(url, params);
