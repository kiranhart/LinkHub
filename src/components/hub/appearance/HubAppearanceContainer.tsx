import { Hub } from '@prisma/client';
import LinkStyleForm from './LinkStyleForm';
import BackgroundStyleForm from './BackgroundStyleForm';

export default function HubAppearanceContainer({ hub }: { hub: Hub }) {
	return (
		<>
			<LinkStyleForm hub={hub} />
			<BackgroundStyleForm hub={hub} />
		</>
	);
}
