"use client";

import { navRoutes } from "@/constants/routes";
import Link from "next/link";
import { usePathname } from "next/navigation";

const Navigations = () => {
	const pathname = usePathname();

	const renderedNavigationButtons = navRoutes.map((route) => {
		// Check if route is active
		const isActive = route.route === pathname || pathname.startsWith(`${route.route}/`);

		return (
			<Link
				key={route.route}
				href={route.route}
				className={`relative inline-flex justify-left gap-4 p-2 sm:p-4 rounded-xl md:rounded-2xl
					${isActive ? "bg-sky-600 text-white" : "text-neutral-600 hover:bg-neutral-100"}`}
				title={route.label}
			>
				{route.icon}
				<p className="hidden 2xl:block font-medium">{route.label}</p>
			</Link>
		);
	});

	return (
		<nav className="flex flex-col gap-3 md:gap-4 items-center 2xl:items-stretch">
			{/* Nav routes */}
			{renderedNavigationButtons}
		</nav>
	);
};

export default Navigations;
