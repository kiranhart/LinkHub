import CreateHub from '@/components/CreateHub';
import HubCard from '@/components/HubCard';
import { Button } from '@/components/ui/button';
import { Hub } from '@/types/hub.types';

export const metadata = {
	title: 'LinkHub - Dashboard',
};

const DUMMY_DATA: Hub[] = [
	{
		id: 'kiranhart',
		name: 'Kiran Hart',
		description: "Hey I'm Kiran, and welcome to my page. Here you will be able to find all of my important links.",
		adult: true,
		public: true,
		links: [
			{ name: 'Discord', url: 'https://www.discord.gg/' },
			{ name: 'SpigotMC', url: 'https://www.spigotmc.org/' },
			{ name: 'GitHub', url: 'https://www.github.com/' },
			{ name: 'Steam', url: 'https://www.steampowerred.com/' },
			{ name: 'OnlyFans', url: 'https://www.onlyfans.com/', adult: true },
			{ name: 'Fansly', url: 'https://www.fansly.com/', adult: true },
		],
	},
];

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
			{/* <div>You do not have any hubs. Please create one first.</div> */}
			<HubList hubs={DUMMY_DATA} />
		</div>
	);
}

function HubList({ hubs }: { hubs: Hub[] }) {
	return (
		<div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3'>
			{hubs.map((hub, index) => {
				return <HubCard key={hub.id} hub={hub} />;
			})}
		</div>
	);
}
