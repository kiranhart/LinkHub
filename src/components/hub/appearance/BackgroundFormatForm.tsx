import { Avatar, AvatarImage } from '@/components/ui/avatar';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Hub } from '@prisma/client';
import { HubContentItem } from '../HubContentItem';
import { Heading4 } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { cn, lightenHex } from '@/lib/utils';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { useState } from 'react';
import { Button } from '@/components/ui/button';

export default function BackgroundFormatForm({ hub }: { hub: Hub }) {
	const [isDown, setIsDown] = useState();
	const [color, setColor] = useState(`#${hub.backgroundColor}`);

	return (
		<Card className='h-fit'>
			<CardHeader>
				<CardTitle className='text-xl font-medium'>Background Formatting</CardTitle>
				<p className='text-sm text-gray-500'>Adjust the direction/colour here.</p>
			</CardHeader>
			<CardContent className='flex flex-col gap-8'>
				<div>
					<h3>Gradient Direction</h3>
					<RadioGroup defaultValue={hub.backgroundDirection} className='mt-3 flex gap-2'>
						<div className='flex items-center space-x-2'>
							<RadioGroupItem value='up' id='up' />
							<Label htmlFor='up'>Up to Down</Label>
						</div>
						<div className='flex items-center space-x-2'>
							<RadioGroupItem value='down' id='down' />
							<Label htmlFor='down'>Down to Up</Label>
						</div>
					</RadioGroup>
				</div>
				<div>
					<h3>Background Colour</h3>
					<input type='color' defaultValue={color} onChange={(e) => setColor(e.target.value)} className={cn('mt-2 flex h-12 w-full cursor-pointer items-center justify-center rounded-md font-bold text-white')} />
				</div>
			</CardContent>
			<CardFooter className='flex justify-between border-t bg-gray-100/80 pb-4 pt-3'>
				<p className='text-sm text-gray-500'>Change background formatting</p>
				<Button variant={'outline'}>Save Changes</Button>
			</CardFooter>
		</Card>
	);
}
