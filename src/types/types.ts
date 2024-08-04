import { HubContent, Prisma } from "@prisma/client";

export type HubAndContent = Prisma.HubGetPayload<{
    
	include: {
		content: true;
	};
}>;


export type ContentWithOrder = {
	content: HubContent;
	contentOrder: string;
}