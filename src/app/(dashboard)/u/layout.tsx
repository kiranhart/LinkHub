import Navbar from '@/components/Navbar';
import SignIn from '@/components/auth/SignIn';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import Link from 'next/link';

import { auth } from '@/auth';
import SignOut from '@/components/auth/SignOut';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

export default async function DashboardLayout({ children }: RootLayoutProps) {
	const session = await auth();

	return (
		<div className=''>
			<div className='absolute inset-0 -z-10 h-full w-full bg-slate-50 bg-[radial-gradient(#dbdde2_1px,transparent_1px)] [background-size:16px_16px]'></div>
			<div className='container p-3 md:p-5'>
				<div className='flex w-full items-center justify-between rounded-md py-4 text-black'>
					<div className='rounded-md'>
						<h1 className='inline-block bg-gradient-to-r from-blue-400 via-purple-400 to-violet-300 bg-clip-text text-3xl font-black text-transparent'>LinkHub</h1>
					</div>

					<ul className='flex items-center gap-4 font-bold'>
						<li>
							<DropdownMenu>
								{session ? (
									<>
										<DropdownMenuTrigger>
											<Avatar>
												<AvatarImage src={session?.user?.image} />
												<AvatarFallback>User</AvatarFallback>
											</Avatar>
										</DropdownMenuTrigger>
										<DropdownMenuContent>
											<DropdownMenuLabel>My Account</DropdownMenuLabel>
											<DropdownMenuSeparator />
											<DropdownMenuItem>
												<Link href='/u'>Dashboard</Link>
											</DropdownMenuItem>
											<DropdownMenuItem>
												<SignOut />
											</DropdownMenuItem>
										</DropdownMenuContent>
									</>
								) : (
									<>
										<SignIn />
									</>
								)}
							</DropdownMenu>
						</li>
					</ul>
				</div>
				{children}
			</div>
		</div>
	);
}
