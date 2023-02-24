import { createTRPCRouter } from "./trpc";
import { hubRouter } from "./routers/hub-router";
import { userRouter } from "./routers/user-router";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here
 */
export const appRouter = createTRPCRouter({
    hub: hubRouter,
    user: userRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
