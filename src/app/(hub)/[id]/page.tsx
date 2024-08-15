'use client';
import notFound from '@/app/not-found';
import { Avatar, AvatarImage } from '@/components/ui/avatar';
import { db } from '@/db';
import { cn, generateLinearGradient } from '@/lib/utils';
import { HubAndContent } from '@/types/types';
import { useQuery } from '@tanstack/react-query';
import ky from 'ky';

export default function PublicHubPage({ params: { id } }: { params: { id: string } }) {
	const hubQuery = useQuery<HubAndContent>({
		queryKey: ['hub-public-page'],
		queryFn: async () => ky.get(`/api/get-hub/${id}`).json<HubAndContent>(),
	});

	if (hubQuery.isLoading) {
		return <div>Loading</div>;
	}

	const bgColor = `#${hubQuery.data?.backgroundColor}`;
	const gradientColor = generateLinearGradient(bgColor, hubQuery.data?.backgroundDirection == 'bottom' ? 'bottom-to-top' : 'top-to-bottom');

	return (
		<div
			className='min-h-screen py-12'
			style={{
				backgroundColor: bgColor,
				background: gradientColor,
			}}
		>
			<div className='container flex w-full flex-col items-center gap-1'>
				{/* Avatar */}
				<Avatar className='h-24 w-24'>
					<AvatarImage
						src={
							hubQuery.data?.picture ||
							`https://api.dicebear.com/7.x/initials/svg?backgroundType=gradientLinear&amp;fontFamily=Helvetica&amp;fontSize=40&amp&seed=${hubQuery.data.username}`
						}
					/>
				</Avatar>
				{/* Username */}
				<h3 className='mt-2 text-lg font-medium'>@{hubQuery.data.username}</h3>
				{/* Name */}
				<h3 className='text-3xl font-black'>{hubQuery.data.name}</h3>
				{/* Bio */}
				<p className='text-xl'>{hubQuery.data?.description}</p>
				{/* Socials */}
				{/* Content */}
				<div>
					{hubQuery.data?.content.map((content, index) => {
						return (
							<div key={content.id} className='w-full'>
								<h3>{content.title}</h3>
							</div>
						);
					})}
				</div>
			</div>
		</div>
	);
}
