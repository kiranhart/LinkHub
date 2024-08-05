import { Hub } from '@prisma/client';

import HubDisplayNameForm from '@/components/hub/settings/HubDisplayNameForm';
import HubUsernameForm from '@/components/hub/settings/HubUsernameForm';
import HubDeleteForm from '@/components/hub/settings/HubDeleteForm';
import HubAvatarForm from './HubAvatarForm';

export default function HubSettingsContainer({ hub }: { hub: Hub }) {
	return (
		<>
			<HubAvatarForm hub={hub} />
			<HubDisplayNameForm hub={hub} />
			<HubUsernameForm hub={hub} />
			<HubDeleteForm hub={hub} />
		</>
	);
}
