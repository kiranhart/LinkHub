import { Avatar, AvatarImage } from '@/components/ui/avatar';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Hub } from '@prisma/client';
import { HubContentItem } from '../HubContentItem';
import { Heading4 } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

export default function BackgroundStyleForm({ hub }: { hub: Hub }) {
	return (
		<Card>
			<CardHeader>
				<CardTitle className='text-xl font-medium'>Backgrounds</CardTitle>
				<p className='text-sm text-gray-500'>What type of background do you want to use?</p>
			</CardHeader>
			<CardContent>
				<BackgroundStyleList hub={hub} />
			</CardContent>
			<hr className='my-2' />
			<CardFooter className='flex justify-between pb-3'>
				
			</CardFooter>
		</Card>
	);
}

function BackgroundStyleList({ hub }: { hub: Hub }) {
	return (
		<div className='flex gap-8'>
			<BackgroundStyle hub={hub} backgroundStyle='flat' />
			<BackgroundStyle hub={hub} backgroundStyle='gradient' />
		</div>
	);
}

function BackgroundStyle({ hub, backgroundStyle }: { hub: Hub; backgroundStyle: 'flat' | 'gradient' }) {
	return (
		<div className='flex w-40 flex-col gap-4'>
			{backgroundStyle == 'flat' && <div className='h-60 rounded-xl bg-gray-700'></div>}
			{backgroundStyle == 'gradient' && <div className='h-60 rounded-xl bg-gradient-to-t from-gray-700 to-gray-600'></div>}
			
			<div className='flex justify-between'>
				<h3 className='text-md font-medium capitalize'>{backgroundStyle}</h3>
				{hub.backgroundType === backgroundStyle && <Badge>Selected</Badge>}
			</div>
		</div>
	);
}
