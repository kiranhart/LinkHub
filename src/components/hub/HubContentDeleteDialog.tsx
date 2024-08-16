'use client';
import { Hub, HubContent } from '@prisma/client';
import { Button } from '@/components/ui/button';
import { Credenza, CredenzaBody, CredenzaClose, CredenzaContent, CredenzaDescription, CredenzaFooter, CredenzaHeader, CredenzaTitle, CredenzaTrigger } from '@/components/ui/credenza';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import LoadingButton from '@/components/LoadingButton';
import { useDeleteHubContentMutation } from '@/components/hub/mutations';
import { Trash } from 'lucide-react';

interface DeleteContentDialogProps {
	content: HubContent;
}

export default function HubContentDeleteDialog({ content }: DeleteContentDialogProps) {
	const router = useRouter();
	const [open, setOpen] = useState(false);
	const mutation = useDeleteHubContentMutation();

	function handleClick() {
		mutation.mutate(
			{
				contentId: content.id,
			},
			{
				onSuccess: () => {
					setOpen(false);
				},
			},
		);
	}

	return (
		<Credenza open={open} onOpenChange={setOpen}>
			<CredenzaTrigger asChild>
				<Trash size={16} className='text-gray-600' />
			</CredenzaTrigger>
			<CredenzaContent className='sm:max-w-[425px]'>
				<CredenzaHeader>
					<CredenzaTitle className='text-center'>Confirm Delete</CredenzaTitle>
					<CredenzaDescription className='text-center'>Are you sure you want to delete that?</CredenzaDescription>
				</CredenzaHeader>
				<CredenzaBody>
					<LoadingButton onClick={handleClick} className='w-full' type='submit' loading={mutation.isPending} variant={'destructive'}>
						Delete
					</LoadingButton>
				</CredenzaBody>
				<CredenzaFooter></CredenzaFooter>
			</CredenzaContent>
		</Credenza>
	);
}
