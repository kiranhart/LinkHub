'use client';
import { Button } from '@/components/ui/button';
import { Hub, HubContent, Prisma } from '@prisma/client';

import { ChevronDown, SlidersHorizontal } from 'lucide-react';
import CreateHubLink from '@/components/hub/create/CreateHubLink';
import CreateHubHeader from '@/components/hub/create/CreateHubHeader';
import HubContentList from '@/components/hub/HubContentList';
import { redirect } from 'next/navigation';

import ky from 'ky';
import { useQuery } from '@tanstack/react-query';
import { useEffect } from 'react';

export default function HubEditPage({ params }: { params: { id: string } }) {
	// TODO check if they even own the hub
	// const hub = await getHub({ username: params.id });
	const hubQuery = useQuery<Hub[]>({
		queryKey: ['hub', 'hub-data'],
		queryFn: async () => ky.get(`/api/hub/${params.id}`).json<Hub[]>(),
	});

	const contentQuery = useQuery<HubContent[]>({
		queryKey: ['hub', 'hub-content'],
		queryFn: async () => ky.get(`/api/hub/${params.id}/content`).json<HubContent[]>(),
	});

	return (
		<div className='flex-w-full mt-10 items-center pt-3'>
			{/* Create Link/Header/Display Stuff */}
			<div className='mx-auto flex w-full max-w-screen-xl flex-col gap-y-3 px-2.5 lg:px-20'>
				<div className='flex flex-wrap items-center justify-between gap-2 md:flex-nowrap'>
					<h1 className='order-1 text-2xl font-semibold tracking-tight text-black'>Links</h1>
					<div className='order-4 flex w-full grow flex-wrap justify-end gap-2 md:order-2 md:w-auto'>
						<div className='grow-basis-0 md:grow-0'>
							<Button variant={'outline'}>
								<div>
									<div className='flex w-full items-center gap-2'>
										<div className='relative-shrink-0'>
											<SlidersHorizontal className='text-gray-40' size={16} />
										</div>
										<div className='grow text-left'>Display</div>
										<ChevronDown className='text-gray-400' size={16} />
									</div>
								</div>
							</Button>
						</div>
					</div>
					<div className='order-3 flex gap-x-2'>
						<div className='grow-0'>
							<CreateHubLink hub={hubQuery?.data} />
						</div>
						<div className='grow-0'>
							<CreateHubHeader hub={hubQuery?.data} />
						</div>
					</div>
				</div>
				<div className='w-full overflow-hidden'>
					<div className='h-max'>
						{contentQuery.isLoading && <div>Fucking loading</div>}
						{contentQuery.data && <HubContentList parentHub={params.id} contentList={contentQuery.data} />}
					</div>
				</div>
			</div>

			<div className='mt-3'>
				<div className='mx-auto grid w-full max-w-screen-xl gap-y-2 px-2.5 lg:px-20'>
					{/* Link List */}
					<div className='div'></div>
					{/* Spacing */}
					<div className='h-[90px]'></div>
					{/* Footer */}
					<LinksNavigation />
				</div>
			</div>
		</div>
	);
}

function LinksNavigation() {
	return (
		<div className='fixed bottom-4 left-1/2 w-full max-w-[768px] -translate-x-1/2 px-2.5 max-[920px]:bottom-5 max-[920px]:pr-20'>
			<nav className='flex w-full items-center justify-between rounded-xl border border-gray-200 bg-white px-4 py-3.5 text-sm leading-6 text-gray-600 [filter:drop-shadow(0_5px_8px_#222A351d)]'>
				<div className='flex items-center gap-2'>
					<div>
						<span className='hidden sm:inline-block'>Viewing</span> <span className='font-medium'>0-0</span> of <span className='font-medium'>0</span> links
					</div>
					<div className='hidden sm:block'></div>
				</div>
				<div className='flex items-center gap-2'>
					<button
						type='button'
						className='group flex h-7 w-full cursor-not-allowed items-center justify-center gap-2 whitespace-nowrap rounded-md border border-gray-200 bg-gray-100 px-2 text-sm text-gray-400'
					>
						<div className=''>Previous</div>
					</button>
					<button
						type='button'
						className='group flex h-7 w-full cursor-not-allowed items-center justify-center gap-2 whitespace-nowrap rounded-md border border-gray-200 bg-gray-100 px-2 text-sm text-gray-400'
					>
						<div className=''>Next</div>
					</button>
				</div>
			</nav>
		</div>
	);
}
