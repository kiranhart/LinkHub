'use client';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { Credenza, CredenzaBody, CredenzaClose, CredenzaContent, CredenzaDescription, CredenzaFooter, CredenzaHeader, CredenzaTitle, CredenzaTrigger } from '@/components/ui/credenza';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Switch } from '@/components/ui/switch';
import { toast } from 'sonner';
import { Hub } from '@/types/hub.types';
import { hubHeaderSchema } from '@/lib/validate';
import { useCreateHubHeaderMutation } from './mutations';

export default function CreateHubHeader({ hub }: { hub: Hub }) {
	const router = useRouter();
	const [open, setOpen] = useState(false);
	const mutation = useCreateHubHeaderMutation();

	const form = useForm<z.infer<typeof hubHeaderSchema>>({
		resolver: zodResolver(hubHeaderSchema),
		defaultValues: {
			title: '',
		},
	});

	function onSubmit(values: z.infer<typeof hubHeaderSchema>) {
		mutation.mutate(
			{
				data: values,
				hubId: hub.username,
			},
			{
				onSuccess: () => {
					form.reset();
					form.clearErrors();
					setOpen(false);
					toast.success('Succesfully created header');
				},
			},
		);
		setOpen(false);
	}
	return (
		<Credenza open={open} onOpenChange={setOpen}>
			<CredenzaTrigger asChild>
				<Button
					variant={'outline'}
					className='border-gray group flex h-10 w-full items-center justify-center gap-2 whitespace-nowrap rounded-md border px-4 text-sm transition-all hover:ring-4 hover:ring-gray-200'
				>
					<div className='flex-1 text-left'>Add header</div>
					<kbd className='hidden rounded bg-gray-200 px-2 py-0.5 text-xs font-light text-gray-400 transition-all duration-75 group-hover:bg-gray-500 group-hover:text-gray-300 md:inline-block'>
						H
					</kbd>
				</Button>
			</CredenzaTrigger>
			<CredenzaContent className='sm:max-w-[425px]'>
				<CredenzaHeader>
					<CredenzaTitle>Add a Header</CredenzaTitle>
					<CredenzaDescription>You are currently adding a header to your hub.</CredenzaDescription>
				</CredenzaHeader>
				<CredenzaBody>
					<Form {...form}>
						<form onSubmit={form.handleSubmit(onSubmit)} className='space-y-4'>
							<FormField
								control={form.control}
								name='title'
								render={({ field }) => (
									<FormItem>
										<FormLabel>Header Name</FormLabel>
										<FormControl>
											<Input placeholder='Social Links' {...field} />
										</FormControl>
										<FormDescription>The name for the header.</FormDescription>
										<FormMessage />
									</FormItem>
								)}
							/>

							<Button className='w-full' type='submit'>
								Create
							</Button>
						</form>
					</Form>
				</CredenzaBody>
			</CredenzaContent>
		</Credenza>
	);
}
