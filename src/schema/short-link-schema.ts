import z from 'zod';

export const ShortLinkSchema = z.object({
    id: z.string(),
    url: z.string(),
    slug: z.string(),
    description: z.string()
});

export const CreateShortLinkSchema = z.object({
    url: z.string(),
    slug: z.string(),
    description: z.string()
});

export const EditShortLinkSchema = z.object({
    url: z.string(),
    slug: z.string(),
    description: z.string()
});

export const SearchShortLinkSchema = z.object({
    keywords: z.string()
});

export const getSingleLinkSchema = z.object({linkId: z.string()});


export type ShortLinkSchema = z.TypeOf<typeof ShortLinkSchema>
export type CreateShortLinkInput = z.TypeOf<typeof CreateShortLinkSchema>
export type EditShortLinkInput = z.TypeOf<typeof EditShortLinkSchema>
export type SearchShortLinkInput = z.TypeOf<typeof SearchShortLinkSchema>
