import { authRouter } from '@/modules/auth/server/procedures';
import { createTRPCRouter } from '../init';
import { categoriesRouter } from '@/modules/categories/server/Procedures';
import { productRouter } from '@/modules/products/server/Procedures';
export const appRouter = createTRPCRouter({
  categories: categoriesRouter,
  auth: authRouter,
  products: productRouter
});
// export type definition of API
export type AppRouter = typeof appRouter;