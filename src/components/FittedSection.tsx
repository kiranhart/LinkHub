import React from 'react';

interface FittedSectionProps {
	title: string;
	headContent?: React.ReactNode;
	children: React.ReactNode;
}

export default function FittedSection({ title, headContent, children}: FittedSectionProps) {
	return (
		<div className='flex-w-full mt-10 items-center pt-3'>
			{/* Create Link/Header/Display Stuff */}
			<div className='mx-auto flex w-full max-w-screen-xl flex-col gap-y-3 px-2.5 lg:px-20'>
				<div className='flex flex-wrap items-center justify-between gap-2 md:flex-nowrap'>
					<h1 className='order-1 text-2xl font-semibold tracking-tight text-black'>{title}</h1>
					{headContent}
				</div>
				<div className='w-full overflow-hidden'>
					<div className='h-max'>
						{children}
					</div>
				</div>
			</div>

			<div className='mt-3'>
				<div className='mx-auto grid w-full max-w-screen-xl gap-y-2 px-2.5 lg:px-20'>
					{/* Link List */}
					<div className='div'></div>
					{/* Spacing */}
					<div className='h-[90px]'></div>
				</div>
			</div>
		</div>
	);
}
