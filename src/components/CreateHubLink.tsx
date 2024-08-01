'use client';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { Credenza, CredenzaBody, CredenzaClose, CredenzaContent, CredenzaDescription, CredenzaFooter, CredenzaHeader, CredenzaTitle, CredenzaTrigger } from '@/components/ui/credenza';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Switch } from '@/components/ui/switch';
import { toast } from 'sonner';
import { Hub } from '@/types/hub.types';

const hubLinkSchema = z.object({
	url: z.string().url({
		message: 'You must provide a url',
	}),
	title: z.string().min(3, {
		message: 'Enter a title for the link',
	}),
	adult: z.boolean().default(false),
});

export default function CreateHubLink({ hub }: { hub: Hub }) {
	const router = useRouter();
	const [open, setOpen] = useState(false);

	const form = useForm<z.infer<typeof hubLinkSchema>>({
		resolver: zodResolver(hubLinkSchema),
		defaultValues: {
			url: '',
			title: '',
			adult: false,
		},
	});

	function onSubmit(values: z.infer<typeof hubLinkSchema>) {
		hub.links?.push({
			name: values.title,
			url: values.url,
			adult: values.adult,
		});
		setOpen(false);
	}

	return (
		<Credenza open={open} onOpenChange={setOpen}>
			<CredenzaTrigger asChild>
				<Button className='w-full' variant={'success'}>
					Add Link
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
							<Button className='w-full' type='submit'>
								Submit
							</Button>
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
