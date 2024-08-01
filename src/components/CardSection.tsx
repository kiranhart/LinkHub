import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';

interface CardSectionProps {
	title: string;
	children?: React.ReactNode;
}

export default function CardSection({ title, children }: CardSectionProps) {
	return (
		<div>
			<h2 className='text-xl font-bold'>{title}</h2>
			<Card className='transition-color mt-2 border-2 border-solid'>
				<CardContent className='p-3 md:p-5'>{children}</CardContent>
			</Card>
		</div>
	);
}
