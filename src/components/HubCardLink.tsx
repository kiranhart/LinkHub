import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Grip, Pen } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { HubContent } from '@prisma/client';

type PreviewMode = 'Live' | 'PhonePreview' | 'Edit';

interface HubLinkProps {
	link: HubContent;
	mode: PreviewMode;
}

export default function HubCardLink({ link, mode = 'Live' }: HubLinkProps) {
	if (mode === 'Edit') {
		return (
			<Card className='transition-color border-2 border-solid duration-150 hover:border-black'>
				<CardHeader className='flex flex-row items-center gap-4'>
					<Grip className='cursor-pointer text-black/50 hover:text-black/80' />
					<div>
						<CardTitle className='flex items-center gap-2 text-lg'>
							{link.title}
							<span>
								<Pen className='h-4' />
							</span>
						</CardTitle>
						<CardDescription className='flex items-center gap-2 leading-relaxed'>
							{link.link}
							<span>
								<Pen className='h-4' />
							</span>
						</CardDescription>
					</div>
				</CardHeader>
				{/* <CardFooter className='flex items-center justify-between'></CardFooter> */}
			</Card>
		);
	}

	return (
		<a className={mode === 'Live' ? 'min-w-full rounded-md bg-white p-4 text-center font-bold' : 'min-w-full rounded-md bg-white p-2 text-center font-medium'} href={link.url}>
			{link.name}
		</a>
	);
}
