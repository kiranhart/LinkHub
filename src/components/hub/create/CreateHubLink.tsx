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
import { hubLinkSchema } from '@/lib/validate';
import { useCreateHubLinkMutation } from './mutations';
import LoadingButton from '@/components/LoadingButton';
import { Hub } from '@prisma/client';

export default function CreateHubLink({ hub }: { hub: Hub }) {
	const router = useRouter();
	const [open, setOpen] = useState(false);
	const mutation = useCreateHubLinkMutation();

	const form = useForm<z.infer<typeof hubLinkSchema>>({
		resolver: zodResolver(hubLinkSchema),
		defaultValues: {
			url: '',
			title: '',
			adult: false,
		},
	});

	function onSubmit(values: z.infer<typeof hubLinkSchema>) {
		mutation.mutate({
			data: values,
			hubId: hub.username
		}, {
			onSuccess: () => {
				form.reset();
				form.clearErrors();

				setOpen(false);
				toast.success('Succesfully created link');
			},
		});
		setOpen(false);
	}

	function handleKeyPress(e: React.KeyboardEvent<HTMLInputElement>) {
		if (e.key === 'c') {
			setOpen(true);
			e.preventDefault();
		}
	}

	useEffect(() => {
		document.addEventListener('keydown', handleKeyPress);
		return function () {
			document.removeEventListener('keydown', handleKeyPress);
		};
	}, []);

	return (
		<Credenza open={open} onOpenChange={setOpen}>
			<CredenzaTrigger asChild>
				<Button className='group flex h-10 w-full items-center justify-center gap-2 whitespace-nowrap rounded-md border border-black bg-black px-4 text-sm text-white transition-all hover:bg-gray-800 hover:ring-4 hover:ring-gray-200'>
					<div className='flex-1 text-left'>Create link</div>
					<kbd className='hidden rounded bg-gray-700 px-2 py-0.5 text-xs font-light text-gray-400 transition-all duration-75 group-hover:bg-gray-600 group-hover:text-gray-300 md:inline-block'>
						C
					</kbd>
				</Button>
			</CredenzaTrigger>
			<CredenzaContent className='sm:max-w-[425px]'>
				<CredenzaHeader>
					<CredenzaTitle>Add a Link</CredenzaTitle>
					<CredenzaDescription>You are currently adding a link to your hub.</CredenzaDescription>
				</CredenzaHeader>
				<CredenzaBody>
					<Form {...form}>
						<form onSubmit={form.handleSubmit(onSubmit)} className='space-y-4'>
							<FormField
								control={form.control}
								name='url'
								render={({ field }) => (
									<FormItem>
										<FormLabel>URL</FormLabel>
										<FormControl>
											<Input placeholder='http://your-link.com' {...field} />
										</FormControl>
										<FormDescription>This is the link users will be redirected to.</FormDescription>
										<FormMessage />
									</FormItem>
								)}
							/>
							<FormField
								control={form.control}
								name='title'
								render={({ field }) => (
									<FormItem>
										<FormLabel>Title</FormLabel>
										<FormControl>
											<Input placeholder='My Link' {...field} />
										</FormControl>
										<FormDescription>A name for the link.</FormDescription>
										<FormMessage />
									</FormItem>
								)}
							/>
							<FormField
								control={form.control}
								name='adult'
								render={({ field }) => (
									<FormItem className='flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm'>
										<div className='space-y-0.5'>
											<FormLabel>Adult Content</FormLabel>
											<FormDescription>Toggle this if this links to NSFW content.</FormDescription>
										</div>
										<FormControl>
											<Switch checked={field.value} onCheckedChange={field.onChange} />
										</FormControl>
									</FormItem>
								)}
							/>
							<LoadingButton className='w-full' type='submit' disabled={mutation.isPending} loading={mutation.isPending}>
								Add
							</LoadingButton>
						</form>
					</Form>
				</CredenzaBody>
				<CredenzaFooter>
					{/* <CredenzaClose asChild>
						<button>Close</button>
					</CredenzaClose> */}
				</CredenzaFooter>
			</CredenzaContent>
		</Credenza>
	);
}
