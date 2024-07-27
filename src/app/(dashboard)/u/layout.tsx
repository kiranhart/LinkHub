import Navbar from '@/components/Navbar';

export default function DashboardLayout({ children }: RootLayoutProps) {
	return (
		<div className=''>
			<div className='absolute inset-0 -z-10 h-full w-full bg-slate-50 bg-[radial-gradient(#dbdde2_1px,transparent_1px)] [background-size:16px_16px]'></div>
			<div className='container p-3 md:p-5'>
				<div className='flex w-full items-center justify-between rounded-md py-4 text-black'>
					<div className='rounded-md'>
						<h1 className='inline-block bg-gradient-to-r from-blue-400 via-purple-400 to-violet-300 bg-clip-text text-3xl font-black text-transparent'>LinkHub</h1>
					</div>

					<ul className='flex gap-4 font-bold'>
						<li>Dashboard</li>
						<li>Account</li>
					</ul>
				</div>
				<div className='mt-12 min-h-full rounded-md border-2 border-solid border-gray-500 bg-white p-3 md:p-5'>{children}</div>
			</div>
		</div>
	);
}
