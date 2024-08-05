'use client';

import HubSettingsContainer from '@/components/hub/settings/HubSettingsContainer';
import { useQuery } from '@tanstack/react-query';
import { Hub } from '@prisma/client';
import ky from 'ky';


export default function SettingsPage({ params }: { params: { id: string } }) {
	const hubQuery = useQuery<Hub>({
		queryKey: ['hub', 'hub-data'],
		queryFn: async () => ky.get(`/api/hub/${params.id}`).json<Hub>(),
	});

	return (
		<div className='flex-w-full mt-10 items-center pt-3'>
			<div className='mx-auto flex w-full max-w-screen-xl flex-col gap-y-3 px-2.5 lg:px-20'>
				<div className='flex flex-wrap items-center justify-between gap-2 md:flex-nowrap'>
					<h1 className='order-1 text-2xl font-semibold tracking-tight text-black'>Hub Settings</h1>
				</div>
				<div className='w-full overflow-hidden'>
					<div className='h-max'>
						<div className='flex w-full flex-wrap items-start gap-4 sm:flex-nowrap sm:items-center'>
							<div className='flex grow flex-col flex-wrap gap-4'>{hubQuery.data && <HubSettingsContainer hub={hubQuery.data} />}</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}