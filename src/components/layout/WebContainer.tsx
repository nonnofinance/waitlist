import { cn } from "@/lib/utils";

interface WebContainerProps {
	children: React.ReactNode;
	className?: string;
}

export function WebContainer({
	children,
	className,
}: WebContainerProps) {
	return (
		<div
			className={cn(
				"mx-auto w-full max-w-7xl px-6 md:px-12 lg:px-20",
				className
			)}
		>
			{children}
		</div>
	);
}
