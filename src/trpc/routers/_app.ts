import { authRouter } from '@/modules/auth/server/procedures';
import { createTRPCRouter } from '../init';
import { categoriesRouter } from '@/modules/categories/server/Procedures';
import { productRouter } from '@/modules/products/server/Procedures';
import { tagsRouter } from '@/modules/tags/server/Procedures';
import { tenantsRouter } from '@/modules/tenants/server/Procedures';
import { checkoutRouter } from '@/modules/checkout/server/Procedures';
import { libraryRouter } from '@/modules/library/server/Procedures';
import { reviewsRouter } from '@/modules/reviews/server/procedures';
export const appRouter = createTRPCRouter({
  categories: categoriesRouter,
  auth: authRouter,
  products: productRouter,
  tags: tagsRouter,
  tenants: tenantsRouter,
  checkout: checkoutRouter,
  library: libraryRouter,
  reviews: reviewsRouter
});
// export type definition of API
export type AppRouter = typeof appRouter;