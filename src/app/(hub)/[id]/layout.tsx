export const metadata = {
	title: 'LinkHub - A home for your links',
};

export default function HubLayout({ children }: RootLayoutProps) {
	return <div className='mx-auto flex min-h-[100vh] min-w-full flex-col bg-background font-sans antialiased'>{children}</div>;
}
