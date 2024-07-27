import React from 'react';

export default function HubLayout({ children }: RootLayoutProps) {
	return <div className='bg-background mx-auto flex min-h-[100vh] min-w-full flex-col font-sans antialiased'>{children}</div>;
}
