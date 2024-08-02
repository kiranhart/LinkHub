import Navbar from '@/components/Navbar';
import SignIn from '@/components/auth/SignIn';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import Link from 'next/link';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

export default async function DashboardLayout({ children }: RootLayoutProps) {
	return (
		<div className='min-h-screen bg-gray-50/80'>
			<Navbar />
			<div className='container p-3 md:p-5'>{children}</div>
		</div>
	);
}
