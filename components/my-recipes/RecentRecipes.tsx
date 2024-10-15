"use client";

import {
	MdOutlineExpandCircleDown,
	MdOutlineArrowLeft,
	MdOutlineArrowRight,
} from "react-icons/md";
import LargeRecipeCard from "../common/LargeRecipeCard";
import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { mockRecipes1 } from "@/constants";

const RecentRecipes = () => {
	// Scroll recipes
	const recipeCardsRef = useRef<HTMLElement[]>([]);
	const [scrollIndex, setScrollIndex] = useState(0);

	// Overflow
	const recipeCardsContainerRef = useRef<HTMLDivElement>(null);
	const isShowingNavigationArrowsRef = useRef(false);
	const [showNavigationArrows, setShowNavigationArrows] = useState(false);

	// End of scroll
	const isEndOfScrollRef = useRef(false);
	const [isEndOfScroll, setIsEndOfScroll] = useState(false);

	// Expansion
	const [isExpanded, setIsExpanded] = useState(true);

	useEffect(() => {
		const checkOverflow = () => {
			if (!recipeCardsContainerRef.current) {
				return;
			}

			// Checks if container is overflowing
			const isOverflow =
				recipeCardsContainerRef.current.scrollWidth >
				recipeCardsContainerRef.current.offsetWidth;

			// Update
			if (isShowingNavigationArrowsRef.current !== isOverflow) {
				if (isOverflow) {
					setShowNavigationArrows(true);
				} else {
					setShowNavigationArrows(false);
				}
			}
			isShowingNavigationArrowsRef.current = isOverflow;
		};

		checkOverflow();

		window.addEventListener("resize", checkOverflow);

		return () => {
			window.removeEventListener("resize", checkOverflow);
		};
	}, []);

	// Render all recent recipe cards
	const recipeCards = mockRecipes1.map((recipe, index) => {
		return (
			<div
				className=""
				key={recipe.name}
				ref={(e: HTMLDivElement) => {
					recipeCardsRef.current[index] = e;
				}}
			>
				<LargeRecipeCard recipe={recipe} />
			</div>
		);
	});

	// Handle horizontal scrolling
	const handleScroll = () => {
		if (!recipeCardsContainerRef.current) {
			return;
		}

		const isEnd =
			Math.abs(
				recipeCardsContainerRef.current.scrollWidth -
					(recipeCardsContainerRef.current.scrollLeft +
						recipeCardsContainerRef.current.clientWidth)
			) <= 1;

		if (isEndOfScrollRef.current !== isEnd) {
			setIsEndOfScroll(isEnd);
		}

		isEndOfScrollRef.current = isEnd;
	};

	// Handle when left and right arrow is clicked
	// direct: 1 -> next recipe
	// direct: -1 -> previous recipe
	const handleChangeRecipeClick = (direction: number) => {
		// If current index is at 0
		if (direction < 0 && scrollIndex === 0) {
			return;
		}

		// If current index is at the last recipe or end of scroll has being reached
		if (
			direction > 0 &&
			(scrollIndex + 1 >= recipeCardsRef.current.length || isEndOfScroll)
		) {
			return;
		}

		// Scroll to recipe
		recipeCardsRef.current[scrollIndex + direction].scrollIntoView({
			behavior: "smooth",
			inline: "start",
			block: "nearest",
		});

		// setIsEndOfScroll(isEnd);
		setScrollIndex((val) => val + direction);
	};

	return (
		<section className="flex flex-col gap-3">
			{/* Title */}
			<div className="flex items-center gap-4">
				<p className="font-semibold">Recently Added</p>
				<div className="bg-neutral-200 h-0.5 grow" />
				<MdOutlineExpandCircleDown
					className="text-neutral-200 text-xl hover:text-neutral-400 cursor-pointer"
					onClick={() => {
						setIsExpanded((val) => !val);
					}}
				/>
			</div>

			{/* Recipe cards */}
			{isExpanded && (
				<div className="relative">
					<div
						ref={recipeCardsContainerRef}
						className="flex gap-9 overflow-x-hidden pb-4"
						onScroll={handleScroll}
					>
						{recipeCards}

						<div className="min-w-[350px] flex justify-center items-center grow">
							<div className="flex flex-col gap-2 items-center">
								<Image
									src="/logo/pantrify_logo.webp"
									alt="logo"
									width={48}
									height={48}
									priority
								/>
								<p className="text-neutral-600 font-semibold italic">
									View all recipes below!
								</p>
							</div>
						</div>
					</div>

					{/* Previous recipe button */}
					<div className="absolute left-2 inset-y-0 flex items-center">
						<MdOutlineArrowLeft
							className={`size-8 bg-black/60 hover:bg-black/80 rounded-full text-4xl text-white cursor-pointer ${
								(scrollIndex === 0 || !showNavigationArrows) &&
								"hidden"
							}`}
							onClick={() => handleChangeRecipeClick(-1)}
						/>
					</div>

					{/* Next recipe button */}
					<div className="absolute right-2 inset-y-0 flex items-center">
						<MdOutlineArrowRight
							className={`size-8 bg-black/60 hover:bg-black/80 rounded-full text-4xl text-white cursor-pointer ${
								(scrollIndex ===
									recipeCardsRef.current.length - 1 ||
									!showNavigationArrows ||
									isEndOfScroll) &&
								"hidden"
							}`}
							onClick={() => handleChangeRecipeClick(1)}
						/>
					</div>
				</div>
			)}
		</section>
	);
};

export default RecentRecipes;
