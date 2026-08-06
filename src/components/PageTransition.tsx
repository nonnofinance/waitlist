"use client";

import { useLayoutEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import gsap from "gsap";

export function PageTransition({
	children,
}: {
	children: React.ReactNode;
}) {
	const overlay = useRef<HTMLDivElement>(null);
	const content = useRef<HTMLDivElement>(null);

	const pathname = usePathname();
	const firstRender = useRef(true);

	useLayoutEffect(() => {
		if (firstRender.current) {
			firstRender.current = false;

			gsap.set(overlay.current, {
				yPercent: 100,
			});

			return;
		}

		const ctx = gsap.context(() => {
			const tl = gsap.timeline({
				defaults: {
					ease: "power3.inOut",
				},
			});

			tl.set(overlay.current, {
				yPercent: -100,
			});

			tl.to(overlay.current, {
				yPercent: 0,
				duration: 0.55,
			});

			tl.to({}, { duration: 0.35 });

			tl.to(
				overlay.current,
				{
					yPercent: 100,
					duration: 0.65,
					ease: "power4.inOut",
				},
				"-=0.05",
			);

			tl.fromTo(
				content.current,
				{
					opacity: 0,
				},
				{
					opacity: 1,
					duration: 0.45,
				},
				"-=0.35",
			);
		});

		return () => ctx.revert();
	}, [pathname]);

	return (
		<>
			<div
				ref={overlay}
				className="
					fixed
					inset-0
					z-9999
					translate-y-full
					bg-[#171513]
				"
			/>

			<div ref={content}>{children}</div>
		</>
	);
}
