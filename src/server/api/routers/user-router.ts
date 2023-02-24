import { z } from 'zod';

import { createTRPCRouter, publicProcedure, protectedProcedure } from "../trpc";

export const userRouter = createTRPCRouter({

    getPublicUser: publicProcedure.input(z.object({
        username: z.string()
    })).query(({ctx, input}) => {
        // create a new hub for this user, 
        // todo in future check account type for hub limits
        const userInfo =  ctx.prisma.user.findFirst({
            where: {
                username: input?.username
            },
            select: {
                image: true,
                name: true,
                username: true,
                Hub: {
                    where: {
                        public: true
                    }
                }
            }
        });

        return userInfo;
    }),

});