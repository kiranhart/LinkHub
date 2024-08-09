'use client';
import { Hub } from '@prisma/client';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Form, FormControl, FormField, FormItem, FormMessage, FormLabel } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useUpdateHubUsername } from '@/components/hub/mutations';
import { useForm } from 'react-hook-form';
import LoadingButton from '@/components/LoadingButton';
import { toast } from 'sonner';

export default function HubUsernameForm({ hub }: { hub: Hub }) {
	const mutation = useUpdateHubUsername();

	const usernameSchema = z.object({
		username: z
			.string()
			.min(3)
			.max(48, 'Username is too long')
			.regex(new RegExp(/^[a-zA-Z0-9-_]+$/), 'Only Letters, Numbers, Dashes/Underscores allowed'),
	});

	const form = useForm<z.infer<typeof usernameSchema>>({
		resolver: zodResolver(usernameSchema),
	});

	function onSubmit(values: z.infer<typeof usernameSchema>) {
		if (values.username === hub.username) {
			toast.error('Cannot use same username...');
			return;
		}

		mutation.mutate({
			username: hub.username,
			newUsername: values.username,
		});
	}

	return (
		<Card id='username'>
			<Form {...form}>
				<form onSubmit={form.handleSubmit(onSubmit)}>
					<CardHeader>
						<CardTitle className='text-xl font-medium'>Username</CardTitle>
						<p className='text-sm text-gray-500'>This is the name others will use to find your hub</p>
					</CardHeader>
					<CardContent>
						<FormField
							control={form.control}
							name='username'
							render={({ field }) => (
								<FormItem>
									<FormLabel>Current username: {hub.username}</FormLabel>
									<FormControl>
										<Input
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
						<p className='text-sm text-gray-500'>Only lowercase letters, numbers, and dashes. Max 48 characters</p>
						<LoadingButton variant={'outline'} type='submit' loading={mutation.isPending} disabled={mutation.isPending}>
							Save Changes
						</LoadingButton>
					</CardFooter>
				</form>
			</Form>
		</Card>
	);
}
