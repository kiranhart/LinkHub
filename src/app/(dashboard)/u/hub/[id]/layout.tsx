import { canUserAccessHub } from '@/components/hub/actions';
import getSession from '@/lib/getSession';
import { capitalizeFirstLetter, extractHubFromURL } from '@/lib/utils';
import { Hub } from '@prisma/client';
import { Metadata } from 'next';
import { redirect } from 'next/navigation';

export async function generateMetadata({ params: { id } }: { params: { id: string } }): Promise<Metadata> {
	return {
		title: `LinkHub - Dashboard | Editing Hub ${capitalizeFirstLetter(id)}`,
	};
}

export default async function HubDashboardLayout({ children, params }: { children: React.ReactNode; params: { id: string } }) {
	const hasPerm = await canUserAccessHub({ username: params.id });
	if (!hasPerm) {
		redirect('/u');
	}

	return <>{children}</>;
}
