import { getHubs } from '@/app/server/hub/actions';
import HubCard from '@/components/HubCard';

export default async function HubList() {
	const hubs = await getHubs();

	if (hubs.error) {
		return (
			<div>
				<h2 className='text-center'>You do not have any hubs</h2>
			</div>
		);
	}

	// if (data.error == null) {
	// 	return (
	// 		<div>
	// 			<h2 className='text-center'>You do not have any hubs</h2>
	// 		</div>
	// 	);
	// }

	return (
		<div className='grid grid-cols-1 gap-3 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3'>
			{hubs.data.map((hub, index) => {
				return <HubCard key={hub.id} hub={hub} />;
			})}
		</div>
	);
}
