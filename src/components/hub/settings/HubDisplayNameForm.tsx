'use client';
import { Hub } from '@prisma/client';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Form, FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useUpdateHubDisplayName } from '@/components/hub/mutations';
import { useForm } from 'react-hook-form';

export default function HubDisplayNameForm({ hub }: { hub: Hub }) {
	const mutation = useUpdateHubDisplayName();

	const displayNameSchema = z.object({
		name: z.string().max(32, 'Display name is too long'),
	});

	const form = useForm<z.infer<typeof displayNameSchema>>({
		resolver: zodResolver(displayNameSchema),
		defaultValues: {
			title: hub.name,
		},
	});

	function onSubmit(values: z.infer<typeof displayNameSchema>) {
		mutation.mutate(
			{
				newDisplayName: values.name,
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
		<Card>
			<Form {...form}>
				<form onSubmit={form.handleSubmit(onSubmit)}>
					<CardHeader>
						<CardTitle className='text-xl font-medium'>Display Name</CardTitle>
						<p className='text-sm text-gray-500'>This is the name that will be displayed under the avatar</p>
					</CardHeader>
					<CardContent>
						<FormField
							control={form.control}
							name='name'
							render={({ field }) => (
								<FormItem>
									<FormControl>
										<Input
											defaultValue={hub.name}
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
						<p className='text-sm text-gray-500'>Max 32 characters</p>
						<Button variant={'outline'} type='submit'>
							Save Changes
						</Button>
					</CardFooter>
				</form>
			</Form>
		</Card>
	);
}
