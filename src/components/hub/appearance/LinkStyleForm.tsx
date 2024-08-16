import { Avatar, AvatarImage } from '@/components/ui/avatar';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Hub } from '@prisma/client';
import { HubContentItem } from '../HubContentItem';
import { getNormalizedLinkStyleName } from '@/lib/utils';
import LinkStyleDialog from '@/components/hub/appearance/LinkStyleDialog';
import ContentStylePreview from './ContentStylePreview';

export default function LinkStyleForm({ hub }: { hub: Hub }) {
	return (
		<Card>
			<CardHeader>
				<CardTitle className='text-xl font-medium'>Header/Link Styling</CardTitle>
				<p className='text-sm text-gray-500'>How should your header/links be styled?</p>
			</CardHeader>
			<CardContent className='flex items-center gap-4'>
				<h3 className='text-xl font-semibold'>Current Style</h3>
				<div className='max-w-[18rem] grow'>
					<ContentStylePreview type={hub.buttonType}>Selected Style</ContentStylePreview>
				</div>
			</CardContent>
			<CardFooter className='flex justify-between border-t bg-gray-100/80 pb-4 pt-3'>
				<p className='text-sm text-gray-500'>Adjust your header/link style.</p>
				<LinkStyleDialog hub={hub} />
			</CardFooter>
		</Card>
	);
}
