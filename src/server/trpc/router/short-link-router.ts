import { z } from 'zod';
import { CreateShortLinkSchema, getSingleLinkSchema, SearchShortLinkSchema, EditShortLinkSchema } from '../../../schema/short-link-schema';
import { router, publicProcedure } from '../trpc';

export const shortLinkRouter = router({
    // create the short link
    createLink: publicProcedure.input(CreateShortLinkSchema).mutation(({ ctx, input}) => {
        const createdLink = ctx.prisma.shortLink.create({
            data: {
                ...input, 
                userId: ctx.session?.user?.id
            }
        });

        return createdLink;
    }),

    // Single Link
    singleLink: publicProcedure.input(getSingleLinkSchema).query(({ ctx, input }) => {
        return ctx.prisma.shortLink?.findUnique({
            where: {
                id: input.linkId,
            },
        });
    }),

    editLink: publicProcedure.input(EditShortLinkSchema).mutation(({ ctx, input }) => {
        const editedLink =  ctx.prisma.shortLink?.update({
            where: {
                id: input.linkId,
            },
            data: {
                ...input,
                userId: ctx.session?.user?.id
            }
        });

        return editedLink;
    }),

    deleteLink: publicProcedure.input(getSingleLinkSchema).mutation(({ ctx, input }) => {
        const deletedLink =  ctx.prisma.shortLink?.delete({
            where: {
                id: input.linkId,
            },
        });

        return deletedLink;
    }),

    // Get all short links
    allLinks: publicProcedure.input(SearchShortLinkSchema).query(({ctx, input}) => {
        return ctx.prisma.shortLink?.findMany({
            where: {
                userId: ctx.session?.user?.id,
                AND: input.keywords ? [{
                    OR: [
                        { url: input.keywords },
                        { slug: input.keywords },
                        { description: input.keywords },
                    ]
                }] : undefined
            }
        });
    }),

    // check slug 
    validateSlug: publicProcedure.input(z.object({ slugId: z.string().nullish()}).nullish()).query(({ctx, input}) => {
        return ctx.prisma.shortLink?.findUnique({
            where: {
                slug:  input?.slugId || ""
            }
        });
    }),
});
