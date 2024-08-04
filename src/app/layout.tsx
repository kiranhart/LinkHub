import '@/styles/globals.css';
import { Inter as FontSans } from 'next/font/google';
import { SessionProvider } from 'next-auth/react';

import { cn } from '@/lib/utils';
import { Toaster } from '@/components/ui/sonner';
import Navbar from '@/components/Navbar';
import ReactQueryProvider from './ReactQueryProvider';

const fontSans = FontSans({
	subsets: ['latin'],
	variable: '--font-sans',
});

export default function RootLayout({ children }: RootLayoutProps) {
	return (
		<html lang='en'>
			<head />
			<body className={cn('mx-auto flex min-h-[100vh] flex-col bg-background font-sans antialiased', fontSans.variable)}>
				<SessionProvider>
					<ReactQueryProvider>
						{children}
						<Toaster />
					</ReactQueryProvider>
				</SessionProvider>
			</body>
		</html>
	);
}
