'use client';
import { Hub, HubContent } from '@prisma/client';
import { Button } from '@/components/ui/button';
import { Credenza, CredenzaBody, CredenzaClose, CredenzaContent, CredenzaDescription, CredenzaFooter, CredenzaHeader, CredenzaTitle, CredenzaTrigger } from '@/components/ui/credenza';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import LoadingButton from '@/components/LoadingButton';
import ContentStylePreview from './ContentStylePreview';
import { AllContentStyles } from '@/types/types';
import { useUpdateHubContentStyle } from '../mutations';

export default function LinkStyleDialog({ hub }: { hub: Hub }) {
	const router = useRouter();
	const [open, setOpen] = useState(false);
	const mutation = useUpdateHubContentStyle();

	return (
		<Credenza open={open} onOpenChange={setOpen}>
			<CredenzaTrigger asChild>
				<Button variant={'outline'}>Change Style</Button>
			</CredenzaTrigger>
			<CredenzaContent className='sm:max-w-[425px]'>
				<CredenzaHeader>
					<CredenzaTitle className='text-center'>Select a Style</CredenzaTitle>
					<CredenzaDescription className='text-center'>Pick the new style for your links/headers.</CredenzaDescription>
				</CredenzaHeader>
				<CredenzaBody className='scrollbar-hide grid h-72 w-full grid-cols-1 gap-6 overflow-y-auto'>
					{AllContentStyles.map((style, index) => {
						return (
							<ContentStylePreview
								key={style + index}
								type={style}
								onClick={() =>
									mutation.mutate(
										{
											username: hub.username,
											contentStyle: style,
										},
										{
											onSuccess: () => {
												setOpen(false);
											},
										},
									)
								}
							>
								{style} {(index % 3) + 1}
							</ContentStylePreview>
						);
					})}
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
