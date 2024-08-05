import { capitalizeFirstLetter } from '@/lib/utils';
import { Metadata } from 'next';

export async function generateMetadata({ params: { id } }: { params: { id: string } }): Promise<Metadata> {
	return {
		title: `LinkHub - Dashboard | Editing Hub ${capitalizeFirstLetter(id)}`,
	};
}

export default function HubDashboardLayout({ children }: { children: React.ReactNode }) {
	return <>{children}</>;
}
