"use client";

import { useDropdown } from "@/hooks";
import Link from "next/link";
import { MdAdd } from "react-icons/md";
import {
	MdOutlineRestaurantMenu,
	MdOutlineEgg,
	MdAddShoppingCart,
} from "react-icons/md";

const AddNavigationButton = () => {
	const [containerRef, isExpanded, onToggle] = useDropdown();

	return (
		<div className="mt-4 relative" ref={containerRef}>
			<div
				className="flex justify-center items-center gap-4 size-12 rounded-full font-semibold 
				bg-emerald-300 hover:bg-emerald-400 cursor-pointer "
				onClick={onToggle}
			>
				<MdAdd className="text-white text-4xl" />
			</div>
			{isExpanded && (
				<div
					className="absolute z-10 top-16 inset-x-0 w-12 bg-neutral-100 border border-neutral-200 
					rounded-full shadow-md flex flex-col items-center gap-3 py-1"
				>
					{/* Add recipe link */}
					<Link
						href="/add-recipe"
						className="flex justify-center items-center size-10 rounded-full cursor-pointer hover:bg-neutral-200"
					>
						<MdOutlineRestaurantMenu className="text-emerald-500 text-2xl" />
					</Link>
					{/* Add ingredient link */}
					<Link
						href="/add-ingredient"
						className="flex justify-center items-center size-10 rounded-full cursor-pointer hover:bg-neutral-200"
					>
						<MdOutlineEgg className="text-sky-500 text-2xl" />
					</Link>
					{/* Add shopping item link */}
					<Link
						href="/add-shopping"
						className="flex justify-center items-center size-10 rounded-full cursor-pointer hover:bg-neutral-200"
					>
						<MdAddShoppingCart className="text-violet-500 text-2xl" />
					</Link>
				</div>
			)}
		</div>
	);
};

export default AddNavigationButton;
