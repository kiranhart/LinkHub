import { capitalizeFirstLetter } from '@/lib/utils';

export async function generateMetadata({ params }) {
	return {
		title: `LinkHub - Dashboard | Editing Hub ${capitalizeFirstLetter(params.id)}`,
	};
}

export default function HubDashboardLayout({ children }: RootLayoutProps) {
	return <>{children}</>;
}
