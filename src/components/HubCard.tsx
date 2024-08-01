'use client';
import { Hub } from '@prisma/client';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default function HubCard({ hub }: { hub: Hub }) {
	return (
		<Card className='transition-color cursor-pointer border-2 border-solid duration-150 hover:border-black'>
			<CardHeader>
				<CardTitle className='mb-2 flex items-center justify-between'>
					<div>{hub.name}</div>
					<Button
						onClick={() => {
							navigator.clipboard.writeText(`https://linkhub.ca/${hub.username}`);
						}}
						variant={'outline'}
					>
						LinkHub.ca/{hub.username}
					</Button>
				</CardTitle>
				<CardDescription className='leading-relaxed'>{hub.description}</CardDescription>
			</CardHeader>
			<CardFooter className='flex items-center justify-between'>
				<Link href={`/u/hub/${encodeURIComponent(hub.username)}`} prefetch>
					<Button>Edit Hub</Button>
				</Link>
				<div className='flex gap-2'>
					{hub.public ? <Badge>Public</Badge> : <Badge variant={'destructive'}>Private</Badge>}
					{hub.adult ? <Badge variant={'destructive'}>NSFW</Badge> : <Badge>SFW</Badge>}
				</div>
			</CardFooter>
		</Card>
	);
}
