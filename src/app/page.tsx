import SignIn from '@/components/auth/SignIn';
import SignOut from '@/components/auth/SignOut';
import { Button } from '@/components/ui/button';
import getSession from '@/lib/getSession';

export default function Home() {
	return (
		<main className='flex min-h-screen items-center justify-center gap-4'>
			<SignIn />
			<SignOut />
		</main>
	);
}
