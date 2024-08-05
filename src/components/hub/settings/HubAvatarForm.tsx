import { Avatar, AvatarImage } from '@/components/ui/avatar';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Hub } from '@prisma/client';

export default function HubAvatarForm({ hub }: { hub: Hub }) {
	return (
		<Card>
			<CardHeader>
				<CardTitle className='text-xl font-medium'>Hub Logo</CardTitle>
				<p className='text-sm text-gray-500'>This is the main display picture that will be shown on your hub</p>
			</CardHeader>
			<CardContent>
				<Avatar className='h-24 w-24'>
					<AvatarImage src={hub.picture || `https://api.dicebear.com/7.x/initials/svg?backgroundType=gradientLinear&amp;fontFamily=Helvetica&amp;fontSize=40&amp&seed=${hub.username}`} />
				</Avatar>
			</CardContent>
			<hr className='my-2' />
			<CardFooter className='flex justify-between pb-3'></CardFooter>
		</Card>
	);
}
