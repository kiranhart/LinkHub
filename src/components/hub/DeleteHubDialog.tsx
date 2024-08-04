'use client';
import { Hub } from '@prisma/client';
import { Button } from '@/components/ui/button';
import { Credenza, CredenzaBody, CredenzaClose, CredenzaContent, CredenzaDescription, CredenzaFooter, CredenzaHeader, CredenzaTitle, CredenzaTrigger } from '@/components/ui/credenza';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import LoadingButton from '../LoadingButton';
import { useDeleteHubMutation } from './mutations';

interface DeleteHubDialogProps {
	hub: Hub;
}

export default function DeleteHubDialog({ hub }: DeleteHubDialogProps) {
	const router = useRouter();
	const [open, setOpen] = useState(false);
	const mutation = useDeleteHubMutation();

	const deleteHubSchema = z
		.object({
			username: z.string({
				message: 'Please enter hub username',
			}),
		})
		.refine((data) => data.username === hub.username, {
			message: 'Please type hub name in correctly.',
		});

	const form = useForm<z.infer<typeof deleteHubSchema>>({
		resolver: zodResolver(deleteHubSchema),
		defaultValues: {
			username: '',
		},
	});

	function onSubmit(values: z.infer<typeof deleteHubSchema>) {
		mutation.mutate(values, {
			onSuccess: () => {
				setOpen(false);
				router.push('/u');
			},
		});
	}

	return (
		<div>
			<Credenza open={open} onOpenChange={setOpen}>
				<CredenzaTrigger asChild>
					<Button variant={'destructive'}>Delete Hub</Button>
				</CredenzaTrigger>
				<CredenzaContent className='sm:max-w-[425px]'>
					<CredenzaHeader>
						<CredenzaTitle className='text-center'>Deleting Hub</CredenzaTitle>
						<CredenzaDescription className='text-center'>
							Please type in <span className='font-bold text-red-400'>{hub?.username}</span> to delete
						</CredenzaDescription>
					</CredenzaHeader>
					<CredenzaBody>
						<Form {...form}>
							<form onSubmit={form.handleSubmit(onSubmit)} className='space-y-4'>
								<FormField
									control={form.control}
									name='username'
									render={({ field }) => (
										<FormItem>
											<FormLabel>Username</FormLabel>
											<FormControl>
												<Input placeholder={hub.username} {...field} />
											</FormControl>
											<FormDescription>This is what others will use to find your hub</FormDescription>
											<FormMessage />
										</FormItem>
									)}
								/>
								<LoadingButton className='w-full' type='submit' loading={false} variant={'destructive'}>
									Delete
								</LoadingButton>
							</form>
						</Form>
					</CredenzaBody>
					<CredenzaFooter></CredenzaFooter>
				</CredenzaContent>
			</Credenza>
		</div>
	);
}
