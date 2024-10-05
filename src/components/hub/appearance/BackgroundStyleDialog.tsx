'use client';
import { Hub, HubContent } from '@prisma/client';
import { Button } from '@/components/ui/button';
import { Credenza, CredenzaBody, CredenzaClose, CredenzaContent, CredenzaDescription, CredenzaFooter, CredenzaHeader, CredenzaTitle, CredenzaTrigger } from '@/components/ui/credenza';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import LoadingButton from '@/components/LoadingButton';
import { useUpdateHubBackgroundType } from '../mutations';

export default function BackgroundStyleDialog({ hub }: { hub: Hub }) {
	const router = useRouter();
	const [open, setOpen] = useState(false);
	const mutation = useUpdateHubBackgroundType();

	return (
		<Credenza open={open} onOpenChange={setOpen}>
			<CredenzaTrigger asChild>
				<Button variant={'outline'}>Change Style</Button>
			</CredenzaTrigger>
			<CredenzaContent className='sm:max-w-[425px]'>
				<CredenzaHeader>
					<CredenzaTitle className='text-center'>Select a Style</CredenzaTitle>
					<CredenzaDescription className='text-center'>Pick a background style</CredenzaDescription>
				</CredenzaHeader>
				<CredenzaBody className='scrollbar-hide grid h-72 w-full grid-cols-2 gap-6 overflow-y-auto py-3'>
					<div
						onClick={() =>
							mutation.mutate(
								{
									username: hub.username,
									bgType: 'Solid',
								},
								{
									onSuccess: () => {
										setOpen(false);
									},
								},
							)
						}
						className='mx-auto flex w-full cursor-pointer items-center justify-center gap-4 rounded-md bg-gray-400'
					>
						<h2 className='text-xl font-bold text-white'>Solid</h2>
					</div>
					<div
						onClick={() =>
							mutation.mutate(
								{
									username: hub.username,
									bgType: 'Gradient',
								},
								{
									onSuccess: () => {
										setOpen(false);
									},
								},
							)
						}
						className='mx-auto flex w-full cursor-pointer items-center justify-center gap-4 rounded-md bg-gradient-to-b from-gray-400 to-gray-500'
					>
						<h2 className='text-xl font-bold text-white'>Gradient</h2>
					</div>
				</CredenzaBody>
				<CredenzaFooter>
					<Button onClick={() => void setOpen(false)} variant={'default'} className='mx-auto mt-2 w-full'>
						Never Mind
					</Button>
				</CredenzaFooter>
			</CredenzaContent>
		</Credenza>
	);
}
