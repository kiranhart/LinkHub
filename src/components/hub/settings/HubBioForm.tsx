'use client';
import { Hub } from '@prisma/client';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Form, FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useUpdateHubBio } from '@/components/hub/mutations';
import { useForm } from 'react-hook-form';
import LoadingButton from '@/components/LoadingButton';
import { Textarea } from '@/components/ui/textarea';

export default function HubBioForm({ hub }: { hub: Hub }) {
	const mutation = useUpdateHubBio();

	const bioSchema = z.object({
		description: z.string().max(60, 'Bio is too long'),
	});

	const form = useForm<z.infer<typeof bioSchema>>({
		resolver: zodResolver(bioSchema),
		defaultValues: {
			bio: hub.description,
		},
	});

	function onSubmit(values: z.infer<typeof bioSchema>) {
		mutation.mutate(
			{
				bio: values.description,
				username: hub.username,
			},
			{
				onSuccess: () => {
					form.reset();
					form.clearErrors();
				},
			},
		);
	}

	return (
		<Card id="bio">
			<Form {...form}>
				<form onSubmit={form.handleSubmit(onSubmit)}>
					<CardHeader>
						<CardTitle className='text-xl font-medium'>Bio</CardTitle>
						<p className='text-sm text-gray-500'>A brief description of yourself/hub</p>
					</CardHeader>
					<CardContent>
						<FormField
							control={form.control}
							name='description'
							render={({ field }) => (
								<FormItem>
									<FormControl>
										<Textarea
											defaultValue={hub.description}
											className='w-full max-w-md rounded-md border border-gray-300 text-gray-900 placeholder-gray-400 focus:border-gray-500 focus:outline-none focus:ring-gray-500 sm:text-sm'
											{...field}
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
					</CardContent>
					<CardFooter className='flex justify-between border-t bg-gray-100/80 pb-4 pt-3'>
						<p className='text-sm text-gray-500'>Max 60 characters</p>
						<LoadingButton variant={'outline'} type='submit' loading={mutation.isPending} disabled={mutation.isPending}>
							Save Changes
						</LoadingButton>
					</CardFooter>
				</form>
			</Form>
		</Card>
	);
}
