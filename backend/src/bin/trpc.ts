import { initTRPC } from '@trpc/server';
import * as trpcExpress from '@trpc/server/adapters/express';
import superjson from 'superjson';

const trpc = initTRPC.context<Awaited<ReturnType<typeof createContext>>>().create({
  transformer: superjson,
  errorFormatter({ shape }) {
    return shape;
  },
});

export const createContext = (_opts: trpcExpress.CreateExpressContextOptions): trpcExpress.CreateExpressContextOptions => _opts;
export const router = trpc.router;
export const middleware = trpc.middleware;
export const publicProcedure = trpc.procedure;
export const privateProcedure = trpc.procedure;