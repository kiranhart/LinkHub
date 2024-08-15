import { Avatar, AvatarImage } from '@/components/ui/avatar';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Hub } from '@prisma/client';
import { HubContentItem } from '../HubContentItem';
import { getNormalizedLinkStyleName } from '@/lib/utils';

export default function LinkStyleForm({ hub }: { hub: Hub }) {
	return (
		<Card>
			<CardHeader>
				<CardTitle className='text-xl font-medium'>Header/Link Styling</CardTitle>
				<p className='text-sm text-gray-500'>How should your header/links be styled?</p>
			</CardHeader>
			<CardContent className='flex flex-col gap-4'>
				<div className='flex flex-col gap-4'>
					<div className='grid grid-cols-1 gap-4 md:grid-cols-3'>
						<HubContentItem className='grid place-items-center'>Style 1</HubContentItem>
					</div>
				</div>
			</CardContent>
			<hr className='my-2' />
			<CardFooter className='flex justify-between pb-3'></CardFooter>
		</Card>
	);
}
