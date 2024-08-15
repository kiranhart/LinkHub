'use client';
import SignIn from '@/components/auth/SignIn';
import SignOut from '@/components/auth/SignOut';
import { Button } from '@/components/ui/button';
import getSession from '@/lib/getSession';
import { useSession } from 'next-auth/react';
import { redirect } from 'next/navigation';

export default function Home() {
	const session = useSession();

	if (session && session.data) {
		redirect('/u');
		return;
	}

	return <main className='flex min-h-screen items-center justify-center gap-4'></main>;
}
