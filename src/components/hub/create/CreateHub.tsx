'use client';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';
import { useState, useTransition } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { Credenza, CredenzaBody, CredenzaClose, CredenzaContent, CredenzaDescription, CredenzaFooter, CredenzaHeader, CredenzaTitle, CredenzaTrigger } from '@/components/ui/credenza';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { toast } from 'sonner';
import { hubFormSchema } from '@/lib/validate';
import { revalidatePath } from 'next/cache';
import { useCreateHubMutation } from './mutations';
import LoadingButton from '@/components/LoadingButton';

export default function CreateHub() {
	const router = useRouter();
	const [open, setOpen] = useState(false);
	const mutation = useCreateHubMutation();

	const form = useForm<z.infer<typeof hubFormSchema>>({
		resolver: zodResolver(hubFormSchema),
		defaultValues: {
			username: '',
			name: '',
			description: 'Welcome to my hub',
			public: true,
			adult: false,
		},
	});

	function onSubmit(values: z.infer<typeof hubFormSchema>) {
		mutation.mutate(values, {
			onSuccess: () => {
				form.reset();
				form.clearErrors();

				setOpen(false);
				toast.success('Created your new Hub');
			},
		});
	}

	return (
		<Credenza open={open} onOpenChange={setOpen}>
			<CredenzaTrigger asChild>
				<Button>Create Hub</Button>
			</CredenzaTrigger>
			<CredenzaContent className='sm:max-w-[425px]'>
				<CredenzaHeader>
					<CredenzaTitle>New Hub</CredenzaTitle>
					<CredenzaDescription>You are currently creating a new hub</CredenzaDescription>
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
											<Input placeholder='example-username' {...field} />
										</FormControl>
										<FormDescription>This is what others will use to find your hub</FormDescription>
										<FormMessage />
									</FormItem>
								)}
							/>
							<FormField
								control={form.control}
								name='name'
								render={({ field }) => (
									<FormItem>
										<FormLabel>Display Name</FormLabel>
										<FormControl>
											<Input placeholder='My Hub' {...field} />
										</FormControl>
										<FormDescription>This is name for your hub</FormDescription>
										<FormMessage />
									</FormItem>
								)}
							/>
							<FormField
								control={form.control}
								name='description'
								render={({ field }) => (
									<FormItem>
										<FormLabel>Description</FormLabel>
										<FormControl>
											<Textarea placeholder='Welcome to my hub' className='resize-none' {...field} />
										</FormControl>
										<FormDescription>A brief description of the hub. (Optional)</FormDescription>
										<FormMessage />
									</FormItem>
								)}
							/>
							<FormField
								control={form.control}
								name='public'
								render={({ field }) => (
									<FormItem className='flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm'>
										<div className='space-y-0.5'>
											<FormLabel>Public</FormLabel>
											<FormDescription>If public, everyone will be able to view your hub</FormDescription>
										</div>
										<FormControl>
											<Switch checked={field.value} onCheckedChange={field.onChange} />
										</FormControl>
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
											<FormDescription>Toggle this if you will have links leading to nsfw content.</FormDescription>
										</div>
										<FormControl>
											<Switch checked={field.value} onCheckedChange={field.onChange} />
										</FormControl>
									</FormItem>
								)}
							/>
							<LoadingButton className='w-full' type='submit' loading={mutation.isPending} disabled={mutation.isPending}>
								Create
							</LoadingButton>
						</form>
					</Form>
				</CredenzaBody>
				<CredenzaFooter></CredenzaFooter>
			</CredenzaContent>
		</Credenza>
	);
}
