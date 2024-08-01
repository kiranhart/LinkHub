import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import CardSection from '@/components/CardSection';
import { Button } from './ui/button';
import { Textarea } from './ui/textarea';
import { Hub } from '@prisma/client';

export default function AppearanceEditor({ hub }: { hub: Hub }) {
	return (
		<div className='flex flex-col gap-8'>
			<ProfileSection hub={hub} />
			<ThemesSection hub={hub} />
			<BackgroundSection hub={hub} />
			<ButtonSection hub={hub} />
			<FontsSection hub={hub} />
		</div>
	);
}

function ThemesSection({ hub }: { hub: Hub }) {
	return (
		<CardSection title='Theme'>
			<div className='flex flex-col gap-4'>
				<div className='flex w-full items-center justify-between gap-8 p-3'></div>
			</div>
		</CardSection>
	);
}

function BackgroundSection({ hub }: { hub: Hub }) {
	return (
		<CardSection title='Background'>
			<div className='flex flex-col gap-4'>
				<div className='flex w-full items-center justify-between gap-8 p-3'></div>
			</div>
		</CardSection>
	);
}

function ButtonSection({ hub }: { hub: Hub }) {
	return (
		<CardSection title='Buttons'>
			<div className='flex flex-col gap-4'>
				<div className='flex w-full items-center justify-between gap-8 p-3'></div>
			</div>
		</CardSection>
	);
}

function FontsSection({ hub }: { hub: Hub }) {
	return (
		<CardSection title='Fonts'>
			<div className='flex flex-col gap-4'>
				<div className='flex w-full items-center justify-between gap-8 p-3'></div>
			</div>
		</CardSection>
	);
}

function ProfileSection({ hub }: { hub: Hub }) {
	return (
		<CardSection title='Profile'>
			<div className='flex flex-col gap-4'>
				{/* Hub Picture */}
				<div className='flex w-full items-center justify-between gap-8 p-3'>
					<Avatar className='h-24 w-24'>
						<AvatarImage src={hub?.picture} />
						<AvatarFallback>HN</AvatarFallback>
					</Avatar>
					<div className='flex w-full flex-col gap-2'>
						<Button className='h-auto w-full' variant={'success'}>
							<h3 className='text-lg font-bold'>Pick an image</h3>
						</Button>
						<Button className='h-auto w-full text-black/40' variant={'outline'}>
							<h3 className='text-lg font-bold'>Remove</h3>
						</Button>
					</div>
				</div>

				{/* Hub Name / Bio */}
				<div className='flex w-full flex-col gap-3.5 px-3'>
					<div className='grid w-full items-center gap-1.5'>
						<Label htmlFor='hubtitle'>Title</Label>
						<Input name='hubtitle' type='text' placeholder='Hub Title' defaultValue={hub?.name} />
					</div>
					<div className='grid w-full items-center gap-1.5'>
						<Label htmlFor='hubbio'>Bio</Label>
						<Textarea name='hubbio' maxLength={80} placeholder='Bio' defaultValue={hub?.description} />
					</div>
				</div>
			</div>
		</CardSection>
	);
}
