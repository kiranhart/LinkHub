import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import MockPhoneDisplay from '@/components/MockPhoneDisplay';
import { Button } from '@/components/ui/button';
import CreateHubLink from '@/components/CreateHubLink';
import HubCardLink from '@/components/HubCardLink';
import AppearanceEditor from '@/components/AppearanceEditor';
import { Prisma } from '@prisma/client';
import { getHub } from '@/app/server/hub/actions';

type Hub = Prisma.HubGetPayload<{
	include: {
		content: true;
	};
}>;

export default async function HubEditPage({ params }: { params: { id: string } }) {
	// TODO check if they even own the hub
	const hub = await getHub({ username: params.id });

	if (hub.error || !hub.data) {
		return <div>Error</div>;
	}

	return (
		<div>
			<hr />
			<Tabs defaultValue='style' className='mt-4'>
				<TabsList className='flex h-12 justify-between bg-purple-500 py-3'>
					<TabsTrigger value='preview' className='text-white/50 data-[state=active]:bg-transparent data-[state=active]:text-white'>
						Preview
					</TabsTrigger>
					<TabsTrigger value='links' className='text-white/50 data-[state=active]:bg-transparent data-[state=active]:text-white'>
						Links
					</TabsTrigger>
					<TabsTrigger value='style' className='text-white/50 data-[state=active]:bg-transparent data-[state=active]:text-white'>
						Appearance
					</TabsTrigger>
					<TabsTrigger value='stats' className='text-white/50 data-[state=active]:bg-transparent data-[state=active]:text-white'>
						Analytics
					</TabsTrigger>
				</TabsList>
				<div className='mt-8'>
					<TabsContent value='preview'>
						<div className='flex flex-col gap-8'>
							<h2 className='text-center text-lg font-bold'>A preview of your hub.</h2>
							<MockPhoneDisplay hub={hub.data} />
						</div>
					</TabsContent>
					<TabsContent value='links'>
						<HubLinksEditor hub={hub.data} />
					</TabsContent>
					<TabsContent value='style'>
						<AppearanceEditor hub={hub.data} />
					</TabsContent>
					<TabsContent value='stats'>View Analytics</TabsContent>
				</div>
			</Tabs>
		</div>
	);
}

function HubLinksEditor({ hub }: { hub: Hub }) {
	return (
		<div>
			<div className='flex justify-between gap-4'>
				<CreateHubLink hub={hub} />
				<Button className='w-full'>Add Header</Button>
			</div>
			<div className='mt-8 flex flex-col gap-4'>
				{hub?.content?.map((link, index) => {
					return <HubCardLink key={link.id} link={link} mode='Edit' />;
				})}
			</div>
		</div>
	);
}
