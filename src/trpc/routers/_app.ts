import { createTRPCRouter } from '../init';
import { categoriesRouter } from '@/modules/categories/server/Procedures';
export const appRouter = createTRPCRouter({
  categories: categoriesRouter
});
// export type definition of API
export type AppRouter = typeof appRouter;