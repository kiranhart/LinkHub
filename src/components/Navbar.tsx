export default function Navbar() {
	return (
		<nav>
			<div className='hidden lg:block'>
				<div className='flex w-full justify-center gap-2.5'>
					<div className='flex h-[50px] items-center rounded-md bg-black px-3 py-[7px] text-white'>
						<h1 className='text-xl font-bold uppercase tracking-wider'>LinkHub</h1>
					</div>
				</div>
			</div>
			<div className='flex h-full items-center lg:hidden'>Mobile</div>
		</nav>
	);
}
