import express, { Express } from 'express';
import morgan from 'morgan';
import cors from 'cors';
import * as trpcExpress from '@trpc/server/adapters/express';
import { router, createContext } from './bin/trpc';
import { payment } from './api/payment/routes';
import { budget } from './api/budget/routes';

const app: Express = express();

export const appRouter = router({
  payment,
  budget,
});

app.use(express.json({ type: 'application/json' }));
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(morgan('dev'));
app.use(
  '/api',
  trpcExpress.createExpressMiddleware({
    router: appRouter,
    createContext,
  })
);

export type AppRouter = typeof appRouter;
export default app;
