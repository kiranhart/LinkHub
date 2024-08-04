import CreateHub from '@/components/hub/create/CreateHub';
import HubCard from '@/components/hub/HubCard';
import HubList from '@/components/hub/HubList';
import { Button } from '@/components/ui/button';
import { Hub } from '@prisma/client';

export const metadata = {
	title: 'LinkHub - Dashboard',
};

export default function DashboardHome() {
	return (
		<div>
			<div className='flex items-center justify-between'>
				<h3 className='text-xl font-black'>
					Dashboard - <span className='text-base font-medium'>An overview of your hubs</span>
				</h3>
				<CreateHub />
			</div>
			<hr className='my-4' />
			<HubList />
		</div>
	);
}
