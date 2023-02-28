import { z } from 'zod';

import { createTRPCRouter, publicProcedure, protectedProcedure } from "../trpc";

export const hubRouter = createTRPCRouter({

    createHub: protectedProcedure.input(z.object({
        name: z.string(),
        description: z.string(),
        public: z.boolean(),
        adultContent: z.boolean(),
    })).mutation(({ctx, input}) => {
        // create a new hub for this user, 
        // todo in future check account type for hub limits
        const createdHub =  ctx.prisma.hub.create({
            data: {
                ...input,
                userId: ctx.session?.user?.id
            }
        });

        return createdHub;
    }),

    getHubs: protectedProcedure.query(({ctx}) => {
        const foundHubs = ctx.prisma.hub.findMany({
            where: {
                userId: ctx.session?.user?.id
            }
        });

        return foundHubs;
    }),

    getHubById: publicProcedure.input(z.object({
        id: z.string()
    })).query(({ctx, input}) => {
        const foundHub = ctx.prisma.hub.findUnique({
            where: {
                id: input.id
            }
        });

        return foundHub;
    }),
});