import { Injectable } from '@angular/core';
import { createTRPCProxyClient, httpBatchLink } from '@trpc/client';
import { AppRouter } from '../../../../backend/src/app';
import superjson from 'superjson';
import {
  Payments,
  Statistics,
} from '../../../../backend/src/api/payment/interfaces';
import { environment } from '../../environments/environments';

@Injectable({
  providedIn: 'root',
})
export class PaymentsService {
  private api = createTRPCProxyClient<AppRouter>({
    transformer: superjson,
    links: [
      httpBatchLink({
        url: environment.url,
      }),
    ],
  });

  public create = async (body: Payments): Promise<Payments> => {
    return await this.api.payment.create.mutate(body);
  };

  public get = async (_id: string): Promise<Statistics> => {
    return await this.api.payment.get.mutate({ _id });
  };

  public remove = async (_id: string): Promise<Payments | null> => {
    return await this.api.payment.remove.mutate({ _id });
  };
}
