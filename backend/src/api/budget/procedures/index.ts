import { publicProcedure } from '../../../bin/trpc';
import { Budget } from '../interfaces';
import BudgetModel from '../models';
import { z } from 'zod';

export const get = publicProcedure.query(async (): Promise<Array<Budget>> => {
  return await BudgetModel.find();
});

export const create = publicProcedure
  .input(z.object({ ammount: z.number(), description: z.string() }))
  .mutation(async ({ input }): Promise<Budget> => {
    return new BudgetModel(input).save();
  });
