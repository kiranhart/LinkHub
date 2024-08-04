'use client';
import { cn } from '@/lib/utils';
import { ContentWithOrder, HubAndContent } from '@/types/types';
import { HubContent } from '@prisma/client';
import { CornerDownRight, GrabIcon, Grip, Pen, Trash } from 'lucide-react';
import { Avatar, AvatarImage } from '../ui/avatar';
import { Badge } from '../ui/badge';

export default function HubContentList({ contentList }: { contentList: ContentWithOrder }) {
	return (
		<div className='flex w-full flex-wrap items-start gap-4 sm:flex-nowrap sm:items-center'>
			<div className='mt-5 flex grow flex-col gap-4'>
				{contentList.content.map((content, index) => {
					return <ContentCard key={content.id} content={content} />;
				})}
			</div>
		</div>
	);
}

function ContentCard({ content }: { content: HubContent }) {
	return (
		<div className='flex items-center rounded-md border px-5 py-3'>
			<div className='pr-2'>
				<Grip size={16} className='cursor-grab text-gray-600' />
			</div>
			<div className='flex grow flex-col'>
				<div className='flex items-center'>
					{content.type === 'link' && (
						<Avatar className='ml-4 h-5 w-5 rounded-none align-middle'>
							<AvatarImage src={`https://www.google.com/s2/favicons?domain=${content.link}`} />
						</Avatar>
					)}

					<h1 className={cn('ml-2 grow font-black', content.type === 'link' ? 'text-left font-medium' : 'ml-0 text-center')}>{content.title}</h1>
				</div>

				{content.type === 'link' && (
					<div className='flex gap-2'>
						<CornerDownRight size={16} className='ml-8 pt-1 text-gray-600' />
						<p className='text-sm text-gray-600'>{content.link}</p>
					</div>
				)}
			</div>
			<div className='flex w-auto gap-2'>
				<Badge variant={content.active ? '' : 'destructive'}>{content.active ? 'Active' : 'Private'}</Badge>
				{content.type === 'link' && <Badge variant={'outline'}>{content.clicks?.toFixed} Clicks</Badge>}
				<div className='flex items-center gap-2'>
					<Pen size={16} className='text-gray-600' />
					<Trash size={16} className='text-gray-600' />
				</div>
			</div>
		</div>
	);
}
