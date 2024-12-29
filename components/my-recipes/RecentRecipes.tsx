"use client";

import LargeRecipeCard from "../common/LargeRecipeCard";
import { useContext, useEffect, useRef, useState } from "react";
import Image from "next/image";
import CollapsiblePanel from "../common/CollapsiblePanel";
import { ChevronLeft, ChevronRight, LoaderCircle } from "lucide-react";
import { RecipeList } from "@/types";
import { getAllRecipes } from "@/api";
import { RefreshContext } from "../common/FetchContext";

const RecentRecipes = () => {
	//* refreshValue: passed to dependency array to retrieve ingredients
	const { refreshValue } = useContext(RefreshContext)!;

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

	// Recipes
	const [recentRecipes, setRecentRecipes] = useState<RecipeList | null>(null);
	const [isLoading, setIsLoading] = useState(false);

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
	}, [recentRecipes]);

	useEffect(() => {
		const fetchRecipes = async () => {
			setIsLoading(true);

			setRecentRecipes(
				await getAllRecipes({
					sortBy: "dateAdded",
					isAscending: false,
					pageSize: 3,
				})
			);

			setIsLoading(false);
		};

		fetchRecipes();
	}, [refreshValue]);

	// Render all recent recipe cards
	const recipeCards = recentRecipes?.recipes.map((recipe, index) => {
		return (
			<div
				key={recipe.id}
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
		if (direction > 0 && (scrollIndex + 1 >= recipeCardsRef.current.length || isEndOfScroll)) {
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
		<CollapsiblePanel title="Recently Added">
			{recentRecipes == null || isLoading ? (
				<div className="flex justify-center items-center">
					<LoaderCircle className="animate-spin" />
				</div>
			) : (
				<div className="relative">
					<div
						ref={recipeCardsContainerRef}
						className="flex gap-9 overflow-x-hidden"
						onScroll={handleScroll}
					>
						{recipeCards}

						<div className="min-w-[350px] flex justify-center items-center card-container rounded-xl grow">
							<div className="flex flex-col gap-2 items-center">
								<Image
									src="/logo/pantrify_logo.webp"
									alt="logo"
									width={48}
									height={48}
									priority
								/>
								<p className="text-neutral-600 font-medium">
									View all recipes below!
								</p>
							</div>
						</div>
					</div>

					{/* Previous recipe button */}
					<div className="absolute left-2 inset-y-0 flex items-center">
						<button
							type="button"
							className={`size-8 bg-black/60 hover:bg-black/80 rounded-full flex justify-center items-center ${
								(scrollIndex === 0 || !showNavigationArrows) && "hidden"
							}`}
							onClick={() => handleChangeRecipeClick(-1)}
						>
							<ChevronLeft color="white" />
						</button>
					</div>

					{/* Next recipe button */}
					<div className="absolute right-2 inset-y-0 flex items-center">
						<button
							type="button"
							className={`size-8 bg-black/60 hover:bg-black/80 rounded-full flex justify-center items-center ${
								(scrollIndex === recipeCardsRef.current.length - 1 ||
									!showNavigationArrows ||
									isEndOfScroll) &&
								"hidden"
							}`}
							onClick={() => handleChangeRecipeClick(1)}
						>
							<ChevronRight color="white" />
						</button>
					</div>
				</div>
			)}
		</CollapsiblePanel>
	);
};

export default RecentRecipes;
