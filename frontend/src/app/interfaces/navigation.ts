import { Statistics } from '../../../../backend/src/api/payment/interfaces';

export interface Navigation {
  budget_id: string;
  budget_name: string;
  statistics?: Statistics;
}
