import FittedSection from '@/components/FittedSection';
import CreateHub from '@/components/hub/create/CreateHub';
import HubCard from '@/components/hub/HubCard';
import HubList from '@/components/hub/HubList';
import { Button } from '@/components/ui/button';
import { Hub } from '@prisma/client';
import { ChevronDown, SlidersHorizontal } from 'lucide-react';

export const metadata = {
	title: 'LinkHub - Dashboard',
};

export default function DashboardHome() {
	return (
		<FittedSection title='Your Hubs' headContent={<CreateAndSortHeader />}>
			<HubList />
		</FittedSection>
	);
}

function CreateAndSortHeader() {
	return (
		<>
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
					<CreateHub />
				</div>
			</div>
		</>
	);
}
