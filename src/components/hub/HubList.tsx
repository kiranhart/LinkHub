'use client';
import { getHubs } from '@/components/hub/actions';
import HubCard from '@/components/hub/HubCard';
import { Hub } from '@prisma/client';
import { useQuery } from '@tanstack/react-query';
import { Loader2 } from 'lucide-react';
import ky from 'ky';
import HubCardLoadSkeleton from './HubCardLoadSkeleton';

export default function HubList() {
	const query = useQuery<Hub[]>({
		queryKey: ['dashboard', 'hub-list'],
		queryFn: async () => ky.get('/api/hubs').json<Hub[]>(),
	});

	if (query.status === 'pending') {
		return <Loader2 className='mx-auto animate-spin' />;
	}

	if (query.status === 'error') {
		return <p className='text-center text-destructive'>An error occured while fetching your hubs.</p>;
	}

	return (
		<div className='grid grid-cols-1 gap-3 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3'>
			{query.data.map((hub, index) => {
				return <HubCard key={hub.id} hub={hub} />;
			})}
		</div>
	);
}
