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