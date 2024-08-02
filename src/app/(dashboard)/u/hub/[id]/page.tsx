import { Button } from '@/components/ui/button';
import { Prisma } from '@prisma/client';
import { getHub } from '@/app/server/hub/actions';

import { ChevronDown, SlidersHorizontal } from 'lucide-react';

type Hub = Prisma.HubGetPayload<{
	include: {
		content: true;
	};
}>;

export default async function HubEditPage({ params }: { params: { id: string } }) {
	// TODO check if they even own the hub
	const hub = await getHub({ username: params.id });

	if (hub.error || !hub.data) {
		return <div>Error</div>;
	}

	return (
		<div className='flex-w-full mt-10 items-center pt-3'>
			{/* Create Link/Header/Display Stuff */}
			<div className='mx-auto flex w-full max-w-screen-xl flex-col gap-y-3 px-2.5 lg:px-20'>
				<div className='flex flex-wrap items-center justify-between gap-2 md:flex-nowrap'>
					<h1 class='order-1 text-2xl font-semibold tracking-tight text-black'>Links</h1>
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
							<Button className='group flex h-10 w-full items-center justify-center gap-2 whitespace-nowrap rounded-md border border-black bg-black px-4 text-sm text-white transition-all hover:bg-gray-800 hover:ring-4 hover:ring-gray-200'>
								<div className='flex-1 text-left'>Create link</div>
								<kbd className='hidden rounded bg-gray-700 px-2 py-0.5 text-xs font-light text-gray-400 transition-all duration-75 group-hover:bg-gray-600 group-hover:text-gray-300 md:inline-block'>
									C
								</kbd>
							</Button>
						</div>
						<div className='grow-0'>
							<Button
								variant={'outline'}
								className='border-gray group flex h-10 w-full items-center justify-center gap-2 whitespace-nowrap rounded-md border px-4 text-sm transition-all hover:ring-4 hover:ring-gray-200'
							>
								<div className='flex-1 text-left'>Add header</div>
								<kbd className='hidden rounded bg-gray-200 px-2 py-0.5 text-xs font-light text-gray-400 transition-all duration-75 group-hover:bg-gray-500 group-hover:text-gray-300 md:inline-block'>
									H
								</kbd>
							</Button>
						</div>
					</div>
				</div>
				<div className='w-full overflow-hidden'>
					<div className='h-max'>
						<div className='flex w-full flex-wrap items-start gap-4 sm:flex-nowrap sm:items-center'>
							<div className='flex grow flex-wrap gap-x-4 gap-y-2'></div>
						</div>
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
					{/* <LinksNavigation /> */}
				</div>
			</div>
		</div>
	);
}

function LinksNavigation() {
	return (
		<div className='fixed bottom-4 left-1/2 w-full max-w-[768px] -translate-x-1/2 px-2.5 max-[920px]:bottom-5 max-[920px]:pr-20'>
			<nav className='flex w-full items-center justify-between rounded-xl border border-gray-200 bg-white px-4 py-3.5 text-sm leading-6 text-gray-600 [filter:drop-shadow(0_5px_8px_#222A351d)]'>
				<div clclassNameass='flex items-center gap-2'>
					<div>
						<span className='hidden sm:inline-block'>Viewing</span> <span className='font-medium'>1-1</span> of <span className='font-medium'>1</span> link
					</div>
					<div className='hidden sm:block'></div>
				</div>
				<div className='flex items-center gap-2'>
					<button
						type='button'
						className='group flex h-7 w-full cursor-not-allowed items-center justify-center gap-2 whitespace-nowrap rounded-md border border-gray-200 bg-gray-100 px-2 text-sm text-gray-400'
					>
						<div class=''>Previous</div>
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
