import { Injectable } from '@angular/core';
import { createTRPCProxyClient, httpBatchLink } from '@trpc/client';
import { AppRouter } from '../../../../backend/src/app';
import superjson from 'superjson';
import { Budget } from '../../../../backend/src/api/budget/interfaces';
import { environment } from '../../environments/environments';

@Injectable({
  providedIn: 'root',
})
export class BudgetsService {
  private api = createTRPCProxyClient<AppRouter>({
    transformer: superjson,
    links: [
      httpBatchLink({
        url: environment.url,
      }),
    ],
  });

  public create = async (body: Budget): Promise<Budget> => {
    return await this.api.budget.create.mutate(body);
  };

  public get = async (): Promise<Array<Budget>> => {
    return await this.api.budget.get.query();
  };
}
