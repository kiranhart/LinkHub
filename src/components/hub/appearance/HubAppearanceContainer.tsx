import { Hub } from '@prisma/client';
import LinkStyleForm from './LinkStyleForm';
import BackgroundStyleForm from './BackgroundStyleForm';
import BackgroundFormatForm from './BackgroundFormatForm';

export default function HubAppearanceContainer({ hub }: { hub: Hub }) {
	return (
		<>
			<LinkStyleForm hub={hub} />
			<div className='grid grid-cols-1 gap-4 md:grid-cols-2'>
				<BackgroundStyleForm hub={hub} />
				<BackgroundFormatForm hub={hub} />
			</div>
		</>
	);
}
