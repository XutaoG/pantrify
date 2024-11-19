"use client";

import { addRecipeRoute, navRoutes } from "@/constants";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { MdAdd } from "react-icons/md";

const Navigations = () => {
	const pathname = usePathname();

	const renderedNavigationButtons = navRoutes.map((route) => {
		// Check if route is active
		const isActive = route.route === pathname || pathname.startsWith(`${route.route}/`);

		return (
			<Link
				key={route.label}
				href={route.route}
				className={`flex justify-left gap-4 p-4 rounded font-semibold
					${isActive ? "bg-sky-600 text-white" : "hover:bg-neutral-200"}`}
			>
				<Image
					src={route.icon}
					alt={route.label}
					width={24}
					height={24}
					className={`${isActive ? "brightness-200 invert-0" : "brightness-50"}`}
				/>
				<p className="hidden 2xl:block">{route.label}</p>
			</Link>
		);
	});

	return (
		<nav className="flex flex-col gap-4 items-center 2xl:items-stretch">
			{/* Nav routes */}
			{renderedNavigationButtons}

			{/* Add recipe route */}
			<div className="mt-4 relative">
				<Link
					href={addRecipeRoute.route}
					className="flex justify-center items-center gap-4 size-12 rounded-full font-semibold 
					bg-emerald-300 hover:bg-emerald-400 cursor-pointer "
				>
					<MdAdd className="text-white text-4xl" />
				</Link>
			</div>
		</nav>
	);
};

export default Navigations;
