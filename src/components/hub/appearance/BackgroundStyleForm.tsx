import { Avatar, AvatarImage } from '@/components/ui/avatar';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Hub } from '@prisma/client';
import { HubContentItem } from '../HubContentItem';
import { Heading4 } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { cn, lightenHex } from '@/lib/utils';
import BackgroundStyleDialog from './BackgroundStyleDialog';

export default function BackgroundStyleForm({ hub }: { hub: Hub }) {
	return (
		<Card>
			<CardHeader>
				<CardTitle className='text-xl font-medium'>Background Style</CardTitle>
				<p className='text-sm text-gray-500'>What type of background do you want to use?</p>
			</CardHeader>
			<CardContent>
				<BackgroundStyle hub={hub} />
			</CardContent>
			<CardFooter className='flex justify-between border-t bg-gray-100/80 pb-4 pt-3'>
				<p className='text-sm text-gray-500'>Change your background style</p>
				<BackgroundStyleDialog hub={hub} />
			</CardFooter>
		</Card>
	);
}

function BackgroundStyle({ hub }: { hub: Hub }) {
	if (hub.backgroundType == 'Gradient') {
		return (
			<div className='mx-auto flex h-60 w-1/2 items-center justify-center gap-4 rounded-md bg-gradient-to-b from-gray-400 to-gray-500'>
				<h2 className='text-xl font-bold text-white'>Gradient</h2>
			</div>
		);
	}

	return (
		<div className='mx-auto flex h-60 w-1/2 items-center justify-center gap-4 rounded-md bg-gray-400'>
			<h2 className='text-xl font-bold text-white'>Solid</h2>
		</div>
	);
}
