"use client";

import { addRecipeRoute, navRoutes } from "@/constants/routes";
import Link from "next/link";
import { usePathname } from "next/navigation";
import AddRecipePage from "../add/add-recipe/AddRecipePage";
import { useState } from "react";

const Navigations = () => {
	const [isAddRecipeModalOpen, setIsAddRecipeModalOpen] = useState(false);

	const openModal = () => {
		setIsAddRecipeModalOpen(true);
	};

	const closeModal = () => {
		setIsAddRecipeModalOpen(false);
	};

	const pathname = usePathname();

	const renderedNavigationButtons = navRoutes.map((route) => {
		// Check if route is active
		const isActive = route.route === pathname || pathname.startsWith(`${route.route}/`);

		return (
			<Link
				key={route.label}
				href={route.route}
				className={`flex justify-left gap-4 p-4 rounded-2xl
					${isActive ? "bg-sky-600 text-white" : "text-neutral-600 hover:bg-neutral-100"}`}
			>
				{route.icon}
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
				<button
					type="button"
					onClick={openModal}
					className="flex justify-center items-center gap-4 size-12 rounded-full font-semibold 
					bg-emerald-300 hover:bg-emerald-400 cursor-pointer "
				>
					{addRecipeRoute.icon}
				</button>
			</div>

			{/* Add recipe modal */}
			{isAddRecipeModalOpen && <AddRecipePage onModalClose={closeModal} />}
		</nav>
	);
};

export default Navigations;
