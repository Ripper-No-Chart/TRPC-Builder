import { publicProcedure } from '../../../bin/trpc';
import { Payments, Statistics } from '../interfaces';
import PaymentModel from '../models';
import BudgetModel from '../../budget/models';
import { Budget } from '../../budget/interfaces';
import { z } from 'zod';

export const get = publicProcedure.input(z.object({ _id: z.string() })).mutation(async ({ input }) => {
  // Get budget aviable
  const budget: Budget = await BudgetModel.findOne(input)
    .lean()
    .exec()
    .then((budget: Budget | null) => {
      return {
        ammount: budget!.ammount,
        description: budget!.description,
      };
    });

  // Get all records of payments
  const records: Array<Payments> = await PaymentModel.find({ budget_id: input });

  // Set total of payments
  const payments: number = records
    .map(({ ammount }) => ammount)
    .reduce((accumulator: number, current: number) => {
      return Number(accumulator) + Number(current);
    }, 0);

  // Set aviable ammount
  const ammount: number = Number(budget!.ammount) - Number(payments);
  return { budget, records, payments, ammount };
});

export const create = publicProcedure
  .input(z.object({ budget_id: z.string(), ammount: z.number(), description: z.string() }))
  .mutation(async ({ input }): Promise<Payments> => {
    return new PaymentModel(input).save();
  });

export const remove = publicProcedure.input(z.object({ _id: z.string() })).mutation(async ({ input }): Promise<Payments | null> => {
  return await PaymentModel.findByIdAndDelete(input._id);
});
