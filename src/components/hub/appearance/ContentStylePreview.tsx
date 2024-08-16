import { cn } from '@/lib/utils';
import { ContentStyle } from '@/types/types';

interface ContentStylePreviewProps extends React.HTMLAttributes<HTMLDivElement> {
	type: ContentStyle;
	children: React.ReactNode;
}

//
export default function ContentStylePreview({ type, children, ...props }: ContentStylePreviewProps) {
	if (type === 'HardShadowRounded') {
		return (
			<div className='cursor-pointer rounded-full bg-black' {...props}>
				<div className='block -translate-x-2 -translate-y-2 rounded-full border-2 border-black bg-white py-2 text-center'>{children}</div>
			</div>
		);
	}

	if (type === 'HardShadowRound') {
		return (
			<div className='cursor-pointer rounded-xl bg-black' {...props}>
				<div className='block -translate-x-2 -translate-y-2 rounded-xl border-2 border-black bg-white py-2 text-center'>{children}</div>
			</div>
		);
	}

	if (type === 'HardShadowSquared') {
		return (
			<div className='cursor-pointer bg-black' {...props}>
				<div className='block -translate-x-2 -translate-y-2 border-2 border-black bg-white py-2 text-center'>{children}</div>
			</div>
		);
	}

	const Style = {
		OutlineRounded: 'rounded-full',
		OutlineRound: 'rounded-xl',
		OutlineSquared: '',
		FillRounded: 'rounded-full bg-black text-white',
		FillRound: 'rounded-xl bg-black text-white',
		FillSquared: 'bg-black text-white',
		SoftShadowRounded: 'rounded-full shadow-xl shadow-slate-300',
		SoftShadowRound: 'rounded-xl shadow-xl shadow-slate-300',
		SoftShadowSquared: 'shadow-xl shadow-slate-300',
	};

	return (
		<div className={cn('cursor-pointer border border-black py-2 text-center', Style[type])} {...props}>
			{children}
		</div>
	);
}
