import { Types } from 'mongoose';
import { Budget } from '../../budget/interfaces';

export interface Payments {
  budget_id: string;
  ammount: number;
  description: string;
}

export interface Statistics {
  budget: Budget;
  records: Array<Payments>;
  payments: number;
  ammount: number;
}
