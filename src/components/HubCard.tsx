'use client';
import { Hub } from '@/types/hub.types';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ConfettiButton } from '@/components/magicui/confetti';

export default function HubCard({ hub }: { hub: Hub }) {
	return (
		<Card className='transition-color cursor-pointer border-2 border-solid duration-150 hover:border-black'>
			<CardHeader>
				<CardTitle className='mb-2 flex items-center justify-between'>
					<div>{hub.name}</div>
					<Button
						onClick={() => {
							navigator.clipboard.writeText(`https://linkhub.ca/${hub.id}`);
						}}
						variant={'outline'}
					>
						LinkHub.ca/{hub.id}
					</Button>
				</CardTitle>
				<CardDescription className='leading-relaxed'>{hub.description}</CardDescription>
			</CardHeader>
			{/* <CardContent>
				<p>Card Content</p>
			</CardContent> */}
			<CardFooter className='flex items-center justify-between'>
				<Button>Edit Hub</Button>
				<div className='flex gap-2'>
					{hub.public ? <Badge>Public</Badge> : <Badge variant={'destructive'}>Private</Badge>}
					{hub.adult ? <Badge variant={'destructive'}>NSFW</Badge> : <Badge>SFW</Badge>}
				</div>
			</CardFooter>
		</Card>
	);
}
