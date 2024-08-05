import { Card, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Hub } from '@prisma/client';
import React from 'react';
import DeleteHubDialog from './DeleteHubDialog';

export default function HubDeleteForm({ hub }: { hub: Hub }) {
	return (
		<Card className='border border-red-400'>
			<CardHeader>
				<CardTitle className='text-xl font-medium'>Delete Hub</CardTitle>
				<p className='text-sm text-gray-500'>This will permanently delete your hub and any links/socials that are associated with it. This action cannot be undone.</p>
			</CardHeader>

			<CardFooter className='flex justify-between border-t border-red-500 bg-red-100/80 pb-4 pt-3'>
				<p className='text-sm text-red-700'>Once again this action cannot be undone - Please be sure this is something you want to do.</p>
				<DeleteHubDialog hub={hub} />
			</CardFooter>
		</Card>
	);
}
