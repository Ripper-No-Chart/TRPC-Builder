import { Schema, Types, model } from 'mongoose';
import moment from 'moment';
import { Payments } from '../interfaces';

const PaymentsSchema: Schema = new Schema(
  {
    budget_id: { type: Types.ObjectId, required: true },
    ammount: { type: Number, required: true },
    description: { type: String, required: true },
    created_at: { type: Number, required: true, default: moment().unix() },
  },
  { versionKey: false }
);

export default model<Payments>('payments', PaymentsSchema);
