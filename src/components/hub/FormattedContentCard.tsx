import { cn } from '@/lib/utils';
import { Hub, HubContent } from '@prisma/client';

interface ContentStylePreviewProps extends React.HTMLAttributes<HTMLDivElement> {
	hub: Hub;
	content: HubContent;
}

export default function FormattedContentCard({ hub, content }: ContentStylePreviewProps) {
	if (content.type === 'header') {
		return <div className='w-full py-3 text-center text-lg font-semibold'>{content.title}</div>;
	}

	const styleMap = {
		HardShadowRounded: 'rounded-full',
		HardShadowRound: 'rounded-xl',
		HardShadowSquared: '',
		OutlineRounded: 'rounded-full',
		OutlineRound: 'rounded-xl',
		OutlineSquared: '',
		FillRounded: 'rounded-full',
		FillRound: 'rounded-xl',
		FillSquared: '',
		SoftShadowRounded: 'rounded-full shadow-xl',
		SoftShadowRound: 'rounded-xl shadow-xl',
		SoftShadowSquared: 'shadow-xl',
	};

	const buttonType = hub.buttonType as keyof typeof styleMap;
	const baseClasses = 'w-full py-4 text-center cursor-pointer';

	let style: React.CSSProperties = {
		color: hub.buttonTextColor,
	};

	let innerStyle: React.CSSProperties = {};

	if (buttonType.startsWith('HardShadow')) {
		style = {
			...style,
			backgroundColor: hub.buttonShadowColor || '#000000',
			padding: '2px',
			boxShadow: `0px 1px ${hub.buttonShadowColor || '#333'}`,
		};
		innerStyle = {
			backgroundColor: hub.buttonColor || '#ffffff',
			transform: 'translate(-6px, -6px)',
			transition: 'transform 0.1s ease-in-out',
			padding: '10px 20px',
			borderRadius: buttonType.includes('Rounded') ? '9999px' : buttonType.includes('Round') ? '12px' : '0px',
		};
	} else if (buttonType.startsWith('Fill')) {
		style.backgroundColor = hub.buttonColor;
	} else if (buttonType.startsWith('Outline')) {
		style.backgroundColor = 'transparent';
	} else if (buttonType.startsWith('SoftShadow')) {
		style.backgroundColor = hub.backgroundColor;
		style.boxShadow = `0 20px 25px -5px ${hub.buttonShadowColor}, 0 10px 10px -5px ${hub.buttonShadowColor}`;
	}

	const classes = cn(baseClasses, styleMap[buttonType], {
		'border-2': buttonType.startsWith('Outline'),
		'border-black': buttonType.startsWith('HardShadow'),
	});

	const innerClasses = cn('block w-full h-full', {
		'border-2 border-black': buttonType.startsWith('HardShadow'),
	});

	if (buttonType.startsWith('HardShadow')) {
		return (
			<WrapIntoURL url={content.link}>
				<div style={style} className={classes}>
					<div style={innerStyle} className={innerClasses}>
						{content.title}
					</div>
				</div>
			</WrapIntoURL>
		);
	}

	return (
		<WrapIntoURL url={content.link}>
			<div style={style} className={classes}>
				{content.title}
			</div>
		</WrapIntoURL>
	);
}

function WrapIntoURL({ children, url }: { content: React.ReactNode; url: string }) {
	return <a href={url}>{children}</a>;
}
