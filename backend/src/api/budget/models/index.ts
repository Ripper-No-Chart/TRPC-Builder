import { Schema, model } from 'mongoose';
import moment from 'moment';
import { Budget } from '../interfaces';

const BudgetSchema: Schema = new Schema(
  {
    ammount: { type: Number, required: true },
    description: { type: String, required: true },
    created_at: { type: Number, required: true, default: moment().unix() },
  },
  { versionKey: false }
);

export default model<Budget>('budget', BudgetSchema);
