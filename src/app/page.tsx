'use client';
import SignIn from '@/components/auth/SignIn';
import SignOut from '@/components/auth/SignOut';
import { Button } from '@/components/ui/button';
import getSession from '@/lib/getSession';
import { signIn, useSession } from 'next-auth/react';
import { redirect } from 'next/navigation';

export default function Home() {
	const session = useSession();

	if (session && session.data) {
		redirect('/u');
		return;
	}

	return (
		<div className='top-0 h-screen w-screen bg-[#000000] bg-[radial-gradient(#ffffff33_1px,#00091d_1px)] bg-[size:20px_20px]'>
			<div className='absolute bottom-0 z-20 w-full bg-black/40 py-4 text-center text-white px-8'>
				Portfolio project by <a href='https://instagram.com/kiranhart'>@KiranHart</a>
				<p className='text-xs mt-2 tracking-wider'>You can use this if you want, but there is no guarantee this will be up forever or that data will be saved consistently.</p>
			</div>
			<div className='relative z-10 flex h-full flex-col items-center justify-center'>
				<h3 className='text-6xl font-black uppercase tracking-wider text-white'>LinkHub</h3>
				<p className='mt-2 text-xl font-medium tracking-wider text-white'>A home for your links.</p>
				<Button
					className='mt-4 cursor-pointer'
					variant={'success'}
					onClick={() => {
						signIn();
					}}
				>
					Login / Signup
				</Button>
			</div>
		</div>
	);
}
