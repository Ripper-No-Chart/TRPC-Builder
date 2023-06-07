import mongoose, { connection } from 'mongoose';
import { load } from 'ts-dotenv';

const env = load({
  MONGO_DB_HOST: String,
});

export const mongoConnection = async (): Promise<typeof connection> => {
  return (await mongoose.connect(env.MONGO_DB_HOST)).connection;
};
