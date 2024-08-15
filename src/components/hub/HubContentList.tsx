'use client';
import { cn } from '@/lib/utils';
import { ContentWithOrder, HubAndContent } from '@/types/types';
import { HubContent } from '@prisma/client';
import { CornerDownRight, GrabIcon, Grip, Pen } from 'lucide-react';
import { Avatar, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { useEffect, useRef, useState } from 'react';

import { DndContext, closestCenter, KeyboardSensor, MouseSensor, useSensor, useSensors } from '@dnd-kit/core';
import { arrayMove, SortableContext, verticalListSortingStrategy, useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { useDeleteHubContentMutation, useUpdateHubContentOrder } from './mutations';
import { toast } from 'sonner';
import HubContentDeleteDialog from './settings/HubContentDeleteDialog';

export default function HubContentList({ parentHub, contentList }) {
	const [content, setContent] = useState(contentList.content);
	const previousOrder = useRef(contentList.content.map((content) => content.id).join('|'));

	const mouseSensor = useSensor(MouseSensor, {
		activationConstraint: {
			distance: 10, // Enable sort function when dragging 10px   💡 here!!!
		},
	});

	const keyboardSensor = useSensor(KeyboardSensor);
	const sensors = useSensors(mouseSensor, keyboardSensor);

	const mutation = useUpdateHubContentOrder();

	const handleDragEnd = (event) => {
		const { active, over } = event;

		if (active.id !== over.id) {
			const oldIndex = content.findIndex((item) => item.id === active.id);
			const newIndex = content.findIndex((item) => item.id === over.id);
			const updatedOrder = arrayMove(content, oldIndex, newIndex);
			const contentOrder = updatedOrder.map((content) => content.id).join('|');

			if (contentOrder !== previousOrder.current) {
				previousOrder.current = contentOrder;
				mutation.mutate(
					{
						username: parentHub,
						newOrder: contentOrder,
					},
					{
						onSuccess: () => {
							toast.success('Updated content order');
						},
					},
				);
			}

			setContent(updatedOrder);
		}
	};

	useEffect(() => {
		setContent(contentList.content);
		previousOrder.current = contentList.content.map((content) => content.id).join('|');
	}, [contentList]);

	return (
		<DndContext collisionDetection={closestCenter} onDragEnd={handleDragEnd} sensors={sensors}>
			<SortableContext items={content} strategy={verticalListSortingStrategy}>
				<div className='flex w-full flex-wrap items-start gap-4 sm:flex-nowrap sm:items-center'>
					<div className='mt-5 flex grow flex-col gap-4'>
						{content.map((content) => {
							return <ContentCard key={content.id} id={content.id} content={content} />;
						})}
					</div>
				</div>
			</SortableContext>
		</DndContext>
	);
}

function ContentCard({ id, content }: { id: string; content: HubContent }) {
	const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id });
	const mutation = useDeleteHubContentMutation();

	const style = {
		transform: CSS.Transform.toString(transform),
		transition,
	};

	return (
		<div ref={setNodeRef} style={style} {...attributes} {...listeners}>
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
					{content.type === 'link' && <Badge variant={content.adult ? 'destructive' : 'success'}>{content.adult ? 'NSFW' : 'SFW'}</Badge>}
					{content.type === 'link' && <Badge variant={'outline'}>{content.clicks?.toFixed()} Clicks</Badge>}
					<div className='flex items-center gap-2'>
						<Pen size={16} className='text-gray-600' />
						{content && <HubContentDeleteDialog content={content} />}
					</div>
				</div>
			</div>
		</div>
	);
}
