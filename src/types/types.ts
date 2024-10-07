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

export type ContentStyleFill = 'FillRounded' | 'FillRound' | 'FillSquared';
export type ContentStyleOutline = 'OutlineRounded' | 'OutlineRound' | 'OutlineSquared';
export type ContentStyleSoftShadow = 'SoftShadowRounded' | 'SoftShadowRound' | 'SoftShadowSquared';
export type ContentStyleHardShadow = 'HardShadowRounded' | 'HardShadowRound' | 'HardShadowSquared';

export type ContentStyle = ContentStyleFill | ContentStyleOutline | ContentStyleSoftShadow | ContentStyleHardShadow;
export type BackgroundStyle = 'Solid' | 'Gradient'
export type BackgroundDirection = 'Up' | 'Down'

const contentStyleFill: ContentStyleFill[] = ['FillRounded', 'FillRound', 'FillSquared'];
const contentStyleOutline: ContentStyleOutline[] = ['OutlineRounded', 'OutlineRound', 'OutlineSquared'];
const contentStyleSoftShadow: ContentStyleSoftShadow[] = ['SoftShadowRounded', 'SoftShadowRound', 'SoftShadowSquared'];
const contentStyleHardShadow: ContentStyleHardShadow[] = ['HardShadowRounded', 'HardShadowRound', 'HardShadowSquared'];

// Combine all arrays into one
export const AllContentStyles: ContentStyle[] = [
  ...contentStyleFill,
  ...contentStyleOutline,
  ...contentStyleSoftShadow,
  ...contentStyleHardShadow
];
