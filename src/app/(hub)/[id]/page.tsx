import notFound from '@/app/not-found';
import { db } from '@/db';
import { HubAndContent } from '@/types/types';
import { Metadata } from 'next';
import { cache } from 'react';

interface PublicHubPageProps {
	params: { username: string };
}

const getHub = cache(async (username: string) => {
	const hub = await db.hub.findFirst({
		where: {
			username: {
				equals: username,
			},
		},
	});

	if (!hub) {
		return notFound();
	}

	return hub;
});

export async function generateMetadata({ params: { username } }: PublicHubPageProps): Promise<Metadata> {
	const hub: HubAndContent = await getHub(username);

	return {
		title: `LinkHub - ${hub.name}`,
	};
}

export default async function PublicHubPage({ params: { username } }: PublicHubPageProps) {
	const hub: HubAndContent = await getHub(username);

	return <div className='min-h-[100vh] bg-orange-200'></div>;
}
