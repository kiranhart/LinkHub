import { Button } from '@/components/ui/button';
import { Prisma } from '@prisma/client';
import { getHub } from '@/components/hub/actions';

import { ChevronDown, SlidersHorizontal } from 'lucide-react';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import CardSection from '@/components/CardSection';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import DeleteHubDialog from '@/components/hub/DeleteHubDialog';

type Hub = Prisma.HubGetPayload<{
	include: {
		content: true;
	};
}>;

export default async function SettingsPage({ params }: { params: { id: string } }) {
	// TODO check if they even own the hub
	const hub = await getHub({ username: params.id });

	if (hub.error || !hub.data) {
		return <div>Error</div>;
	}

	return (
		<div className='flex-w-full mt-10 items-center pt-3'>
			<div className='mx-auto flex w-full max-w-screen-xl flex-col gap-y-3 px-2.5 lg:px-20'>
				<div className='flex flex-wrap items-center justify-between gap-2 md:flex-nowrap'>
					<h1 className='order-1 text-2xl font-semibold tracking-tight text-black'>Hub Settings</h1>
				</div>
				<div className='w-full overflow-hidden'>
					<div className='h-max'>
						<div className='flex w-full flex-wrap items-start gap-4 sm:flex-nowrap sm:items-center'>
							<div className='flex grow flex-col flex-wrap gap-4'>
								<Card>
									<CardHeader>
										<CardTitle className='text-xl font-medium'>Hub Logo</CardTitle>
										<p className='text-sm text-gray-500'>This is the main display picture that will be shown on your hub</p>
									</CardHeader>
									<CardContent>
										<Avatar className='h-24 w-24'>
											<AvatarImage
												src={
													hub?.data?.picture ||
													`https://api.dicebear.com/7.x/initials/svg?backgroundType=gradientLinear&amp;fontFamily=Helvetica&amp;fontSize=40&amp&seed=${hub?.data.username}`
												}
											/>
										</Avatar>
									</CardContent>
									<hr className='my-2' />
									<CardFooter className='flex justify-between pb-3'></CardFooter>
								</Card>
								<Card>
									<CardHeader>
										<CardTitle className='text-xl font-medium'>Display Name</CardTitle>
										<p className='text-sm text-gray-500'>This is the name that will be displayed under the avatar</p>
									</CardHeader>
									<CardContent>
										<Input
											defaultValue={hub?.data?.name}
											className='w-full max-w-md rounded-md border border-gray-300 text-gray-900 placeholder-gray-400 focus:border-gray-500 focus:outline-none focus:ring-gray-500 sm:text-sm'
										/>
									</CardContent>
									<CardFooter className='flex justify-between border-t bg-gray-100/80 pb-4 pt-3'>
										<p className='text-sm text-gray-500'>Max 32 characters</p>
										<Button variant={'outline'}>Save Changes</Button>
									</CardFooter>
								</Card>
								<Card>
									<CardHeader>
										<CardTitle className='text-xl font-medium'>Username</CardTitle>
										<p className='text-sm text-gray-500'>This is the name others will use to find your hub</p>
									</CardHeader>
									<CardContent>
										<Input
											defaultValue={hub?.data?.username}
											className='w-full max-w-md rounded-md border border-gray-300 text-gray-900 placeholder-gray-400 focus:border-gray-500 focus:outline-none focus:ring-gray-500 sm:text-sm'
										/>
									</CardContent>
									<CardFooter className='flex justify-between border-t bg-gray-100/80 pb-4 pt-3'>
										<p className='text-sm text-gray-500'>Only lowercase letters, numbers, and dashes. Max 48 characters</p>
										<Button variant={'outline'}>Save Changes</Button>
									</CardFooter>
								</Card>

								{/* Delete */}
								<Card className='border border-red-400'>
									<CardHeader>
										<CardTitle className='text-xl font-medium'>Delete Hub</CardTitle>
										<p className='text-sm text-gray-500'>This will permanently delete your hub and any links/socials that are associated with it. This action cannot be undone.</p>
									</CardHeader>

									<CardFooter className='flex justify-between border-t border-red-500 bg-red-100/80 pb-4 pt-3'>
										<p className='text-sm text-red-700'>Once again this action cannot be undone - Please be sure this is something you want to do.</p>
										<DeleteHubDialog hub={hub?.data} />
									</CardFooter>
								</Card>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
