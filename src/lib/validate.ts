import { z } from "zod";

export const hubFormSchema = z.object({
	username: z.string().min(3, {
		message: 'Hub username must be at least 3 characters.',
	}),
	name: z.string().min(3, {
		message: 'Hub name must be at least 3 characters.',
	}),
	description: z.string().optional(),
	public: z.boolean().default(true),
	adult: z.boolean().default(false),
});

export const hubLinkSchema = z.object({
	url: z.string().url({
		message: 'You must provide a url',
	}),
	title: z.string().min(3, {
		message: 'Enter a title for the link',
	}),
	adult: z.boolean().default(false),
});

export const hubHeaderSchema = z.object({
	title: z.string().min(3, {
		message: 'Enter a name for the header',
	})
});

export type CreateHubSchema = z.infer<typeof hubFormSchema>;
export type CreateHubLinkSchema = z.infer<typeof hubFormSchema>
export type CreateHubHeaderSchema = z.infer<typeof hubHeaderSchema>