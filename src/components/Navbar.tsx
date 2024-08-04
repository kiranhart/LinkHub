'use client';
import { extractHubFromURL } from '@/lib/utils';
import { User } from 'next-auth';
import { useSession } from 'next-auth/react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';

export default function Navbar() {
	const path = usePathname();
	const session = useSession();
	const user = session.data?.user;

	const isBaseDashboard = path === '/u';
	const isHubPath = path.includes('/hub/');
	const currentHub = extractHubFromURL(path);

	const diceBearLink = `https://api.dicebear.com/7.x/initials/svg?backgroundType=gradientLinear&amp;fontFamily=Helvetica&amp;fontSize=40&amp&seed=${isHubPath ? currentHub : user?.name}`;

	return (
		<header className='sticky -top-16 z-20 border-b border-gray-200 bg-white'>
			<nav className='mx-auto w-full max-w-screen-xl px-2.5 lg:px-20'>
				{/* Top Section */}
				<div className='flex h-16 items-center justify-between'>
					{/* Selected hub */}
					<div className='flex items-center'>
						<a className='hidden transition-all sm:block' href='/u'>
							<h3 className='text-xl font-black text-black'>LinkHub</h3>
						</a>
						<SlashDivider />
						{user && (
							<div>
								<button
									className='flex items-center justify-between rounded-lg bg-white p-1.5 text-left text-sm transition-all duration-75 hover:bg-gray-100 focus:outline-none active:bg-gray-200 sm:inline-flex'
									type='button'
								>
									<div className='flex items-center space-x-3 pr-2'>
										<img
											loading='lazy'
											width='20'
											height='20'
											decoding='async'
											data-nimg='1'
											className='h-8 w-8 flex-none overflow-hidden rounded-full blur-0'
											src={`${isBaseDashboard ? user?.image : diceBearLink}`}
											style={{ color: 'transparent' }}
										/>
										<div className='flex items-center space-x-3 sm:flex'>
											<span className='inline-block max-w-[100px] truncate text-sm font-medium sm:max-w-[200px]'>{isBaseDashboard ? user?.name : currentHub}</span>
											<span className='max-w-fit whitespace-nowrap rounded-full border border-black bg-black px-2 py-px text-xs font-medium capitalize text-white'>
												{isBaseDashboard ? 'Dashboard' : 'free'}
											</span>
										</div>
									</div>
								</button>
							</div>
						)}
					</div>

					{/* account profile thing */}
					<div className='flex items-center space-x-6'>
						<button className='transition-all duration-75 active:scale-95'>
							<span className='bg-gradient-to-r from-violet-600 to-pink-600 bg-clip-text text-sm text-transparent'>Upgrade</span>
						</button>
						<div className='relative inline-block pt-1.5'>
							<button className='group relative sm:inline-flex' type='button'>
								<img
									alt='Avatar'
									src={user?.image}
									className='h-9 w-9 rounded-full border border-gray-300 transition-all duration-75 group-focus:outline-none group-active:scale-95 sm:h-10 sm:w-10'
									draggable='false'
								/>
							</button>
						</div>
					</div>
				</div>
				{/* Tabs */}
				{!isBaseDashboard && (
					<div className='scrollbar-hide relative flex gap-x-2 overflow-x-auto transition-all'>
						<Link className='relative' href={`/u/hub/${currentHub}`} prefetch>
							<div className='mx-1 my-1.5 rounded-md px-3 py-1.5 transition-all duration-75 hover:bg-gray-100 active:bg-gray-200'>
								<p className='text-sm text-gray-600 hover:text-black'>Links</p>
							</div>
							{path === `/u/hub/${currentHub}` && <BottomLinkBorder />}
						</Link>
						<Link className='relative' href={`/u/hub/${currentHub}/appearance`} prefetch>
							<div className='mx-1 my-1.5 rounded-md px-3 py-1.5 transition-all duration-75 hover:bg-gray-100 active:bg-gray-200'>
								<p className='text-sm text-gray-600 hover:text-black'>Appearance</p>
							</div>
							{path === `/u/hub/${currentHub}/appearance` && <BottomLinkBorder />}
						</Link>
						<Link className='relative' href={`/u/hub/${currentHub}/settings`} prefetch>
							<div className='mx-1 my-1.5 rounded-md px-3 py-1.5 transition-all duration-75 hover:bg-gray-100 active:bg-gray-200'>
								<p className='text-sm text-gray-600 hover:text-black'>Settings</p>
							</div>
							{path === `/u/hub/${currentHub}/settings` && <BottomLinkBorder />}
						</Link>
					</div>
				)}
			</nav>
		</header>
	);
}

function BottomLinkBorder() {
	return (
		<div className='absolute bottom-0 w-full px-1.5'>
			<div className='h-0.5 bg-black'></div>
		</div>
	);
}

function SlashDivider() {
	return (
		<svg
			fill='none'
			shapeRendering='geometricPrecision'
			stroke='currentColor'
			strokeLinecap='round'
			strokeLinejoin='round'
			strokeWidth='1'
			viewBox='0 0 24 24'
			width='14'
			height='14'
			className='hidden h-8 w-8 text-gray-200 sm:ml-3 sm:block'
		>
			<path d='M16.88 3.549L7.12 20.451'></path>
		</svg>
	);
}
