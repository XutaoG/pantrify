"use client";

import CollapsiblePanel from "../common/CollapsiblePanel";
import IngredientCard from "./IngredientCard";
import { LoaderCircle } from "lucide-react";
import Pagination from "../common/Pagination";
import { ingredientSortSelections, shoppingListSortSelections, SortSchema } from "@/constants";
import SearchBar from "../common/SearchBar";
import { useIngredients } from "@/hooks";
import SortDropdown from "../common/SortDropdown";
import { getPluralEnding } from "@/utils";

interface AllIngredientsProps {
	ingredientType: "Primary" | "Secondary";
	isAvailable?: boolean;
	isInCart?: boolean;
	pageSize: number;
	noIngredientMessage: string;
	refreshValue: boolean;
}

const AllIngredients = ({
	ingredientType,
	isAvailable,
	isInCart,
	pageSize,
	noIngredientMessage,
	refreshValue,
}: AllIngredientsProps) => {
	const {
		ingredients,
		searchWord,
		setSearchWord,
		setSortOption,
		isLoading,
		pageNumber,
		setPageNumber,
	} = useIngredients({ ingredientType, isAvailable, isInCart, pageSize, refreshValue });

	const search = (searchWord: string) => {
		setSearchWord(searchWord);
	};

	const sort = (sortBy: SortSchema) => {
		setSortOption(sortBy);
	};

	// Render cards
	const ingredientCards = ingredients?.ingredients.map((ingredient) => {
		return (
			<IngredientCard
				key={ingredient.id}
				ingredient={ingredient}
				mode={isAvailable ? "ingredient" : "shopping"}
			/>
		);
	});

	const sortSelections = isAvailable ? ingredientSortSelections : shoppingListSortSelections;

	return (
		<CollapsiblePanel
			title={ingredientType == "Primary" ? "Primary Ingredients" : "Secondary Ingredients"}
		>
			<section className="flex flex-col gap-6">
				{/* Search and sort */}
				<div className="flex gap-6">
					<SearchBar placeholderText="Search for a ingredient" onSearch={search} />
					<SortDropdown selections={sortSelections} onSort={sort} />
				</div>

				{/* Show current search word */}
				{searchWord !== "" && (
					<div className="flex justify-center items-center">
						<p className="text-sky-600">
							Searching for <span className="font-medium">{`"${searchWord}"`}</span>{" "}
							(Found {ingredients?.totalCount ?? 0} result
							{getPluralEnding(ingredients?.totalCount ?? 0)})
						</p>
					</div>
				)}

				{ingredients == null && isLoading && (
					<div className="flex justify-center items-center">
						<LoaderCircle className="animate-spin" />
					</div>
				)}
				{ingredients != null &&
					(ingredients.totalCount !== 0 ? (
						// ingredient cards
						<div className="flex flex-col gap-6">
							<div className="grid grid-cols-3 2xl:grid-cols-4 gap-6">
								{ingredientCards}
							</div>
							<Pagination
								pageSize={pageSize}
								totalCount={ingredients.totalCount}
								currentPageNumber={pageNumber}
								setCurrentPageNumber={setPageNumber}
							/>
						</div>
					) : (
						searchWord === "" && (
							// No ingredients
							<div className="h-16 flex justify-center items-center">
								<p className="font-medium italic">{noIngredientMessage}</p>
							</div>
						)
					))}
			</section>
		</CollapsiblePanel>
	);
};

export default AllIngredients;
