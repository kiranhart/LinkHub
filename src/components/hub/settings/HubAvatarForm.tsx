import { Avatar, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Hub } from '@prisma/client';
import { useState } from 'react';
import { updateHubPicture } from '../actions';
import { useUpdateHubPicture } from '../mutations';
import LoadingButton from '@/components/LoadingButton';
import { fileToBase64 } from '@/lib/utils';

export default function HubAvatarForm({ hub }: { hub: Hub }) {
	const [pfpPicture, setPfpPicture] = useState('');
	const [pfpPictureBlob, setPfpPictureBlob] = useState('');

	const mutation = useUpdateHubPicture();

	const handleSubmit = async () => {
		if (!pfpPicture) return;

		try {
			// Convert File to base64
			const base64 = await fileToBase64(pfpPicture);

			mutation.mutate({
				username: hub.username,
				picture: base64,
			});
		} catch (error) {
			console.error('Error converting file:', error);
			toast.error('Failed to process the image. Please try again.');
		}
	};

	let pfpPicImage = hub.picture;

	if (pfpPicImage == undefined) {
		pfpPicImage = `https://api.dicebear.com/7.x/initials/svg?backgroundType=gradientLinear&amp;fontFamily=Helvetica&amp;fontSize=40&amp&seed=${hub.username}`;
	}

	return (
		<Card>
			<CardHeader>
				<CardTitle className='text-xl font-medium'>Hub Logo</CardTitle>
				<p className='text-sm text-gray-500'>This is the main display picture that will be shown on your hub</p>
			</CardHeader>
			<CardContent className='flex justify-between'>
				<Avatar className='h-24 w-24'>
					<AvatarImage src={pfpPicImage} />
				</Avatar>
				<div>
					<div className='max-w-xl'>
						<label className='flex w-full cursor-pointer appearance-none justify-center rounded-md border-2 border-dashed border-gray-300 bg-white px-4 py-6 transition hover:border-gray-400 focus:outline-none'>
							<span className='flex items-center'>
								<span className='font-medium text-gray-600'>Upload an image</span>
							</span>
							<input
								type='file'
								name='file_upload'
								className='hidden'
								accept='image/*'
								onChange={(e) => {
									setPfpPicture(e.target.files[0]);
									setPfpPictureBlob(URL.createObjectURL(e.target.files[0]));
								}}
							/>
						</label>
					</div>
					<Button className='mt-4 w-full' variant={'outline'} onClick={() => setPfpPicture('')}>
						Clear
					</Button>
				</div>
			</CardContent>
			<CardFooter className='flex justify-between border-t bg-gray-100/80 pb-4 pt-3'>
				<p className='text-sm text-gray-500'>Update your hub's profile picture</p>
				<LoadingButton loading={mutation.isPending} disabled={mutation.isPending} variant={'outline'} onClick={handleSubmit}>
					Save Changes
				</LoadingButton>
			</CardFooter>
		</Card>
	);
}
