import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';

import { cn } from '@/lib/utils';

const contentVariants = cva('py-2 border border-black', {
	variants: {
		variant: {
			outlineRounded: 'rounded-full',
			outlineRound: 'rounded-xl',
			outlineSquared: '',

			fillRounded: 'rounded-full bg-black text-white',
			fillRound: 'rounded-xl bg-black text-white',
			fillSquared: 'bg-black text-white',

			softShadowRounded: 'rounded-full shadow-xl shadow-slate-300',
			softShadowRound: 'rounded-xl shadow-xl shadow-slate-300',
			softShadowSquared: 'shadow-xl shadow-slate-300',

			softShadowRounded: 'rounded-full shadow-xl shadow-slate-300',
			softShadowRound: 'rounded-xl shadow-xl shadow-slate-300',
			softShadowSquared: 'shadow-xl shadow-slate-300',

			hardShadowRounded: 'block -translate-x-2 -translate-y-2 rounded-full border-2 bg-white ',
			hardShadowRound: 'block -translate-x-2 -translate-y-2 rounded-xl border-2  bg-white',
			hardShadowSquared: 'block -translate-x-2 -translate-y-2 border-2 bg-white',
		},
	},
	defaultVariants: {
		variant: 'default',
	},
});

export interface ContentItemProps extends React.HTMLAttributes<HTMLDivElement>, VariantProps<typeof contentVariants> {
	selected: boolean;
}

function HubContentItem({ className, variant, selected = false, ...props }: ContentItemProps) {
	if (variant == 'hardShadowRounded')
		return (
			<div>
				<div className='rounded-full bg-black'>
					<div className={cn(contentVariants({ variant }), className)} {...props} />
				</div>
			</div>
		);

	if (variant == 'hardShadowRound')
		return (
			<div>
				<div className='rounded-xl bg-black'>
					<div className={cn(contentVariants({ variant }), className)} {...props} />
				</div>
			</div>
		);

	if (variant == 'hardShadowSquared')
		return (
			<div>
				<div className='bg-black'>
					<div className={cn(contentVariants({ variant }), className)} {...props} />
				</div>
			</div>
		);

	return (
		<div className={cn('py-2 px-2', selected ? 'border-2 border-green-400/70 rounded-xl' : '')}>
			<div className={cn(contentVariants({ variant }), className)} {...props} />
		</div>
	);
}

export { HubContentItem, contentVariants };
