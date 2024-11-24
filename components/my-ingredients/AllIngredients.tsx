"use client";

import CollapsiblePanel from "../common/CollapsiblePanel";
import IngredientCard from "../common/IngredientCard";
import { LoaderCircle } from "lucide-react";
import Pagination from "../common/Pagination";
import { IngredientSortSchema, ingredientSortSelections } from "@/constants";
import SearchBar from "../common/SearchBar";
import IngredientSortDropdown from "./IngredientSortDropdown";
import { useIngredients } from "@/hooks";

interface AllIngredientsProps {
	ingredientType: "Primary" | "Secondary";
	isAvailable: boolean;
	isInCart: boolean;
	pageSize: number;
	noIngredientMessage: string;
}

const AllIngredients = ({
	ingredientType,
	isAvailable,
	isInCart,
	pageSize,
	noIngredientMessage,
}: AllIngredientsProps) => {
	const {
		ingredients,
		searchWord,
		setSearchWord,
		setSortOption,
		isLoading,
		pageNumber,
		setPageNumber,
	} = useIngredients({ ingredientType, isAvailable, isInCart, pageSize });

	const search = (searchWord: string) => {
		setSearchWord(searchWord);
	};

	const sort = (sortBy: IngredientSortSchema) => {
		setSortOption(sortBy);
	};

	// Render cards
	const ingredientCards = ingredients?.ingredients.map((ingredient) => {
		return <IngredientCard key={ingredient.id} ingredient={ingredient} mode="ingredient" />;
	});

	return (
		<CollapsiblePanel
			title={ingredientType == "Primary" ? "Primary Ingredients" : "Secondary Ingredients"}
		>
			<section className="flex flex-col gap-6">
				{/* Search and sort */}
				<div className="flex gap-6">
					<SearchBar placeholderText="Search for a ingredient" onSearch={search} />
					<IngredientSortDropdown selections={ingredientSortSelections} onSort={sort} />
				</div>

				{/* Show current search word */}
				{searchWord !== "" && (
					<div className="flex justify-center items-center">
						<p className="text-sky-600">
							Searching for <span className="font-medium">{`"${searchWord}"`}</span>
						</p>
					</div>
				)}

				{ingredients == null && isLoading && (
					<div className="flex justify-center items-center">
						<LoaderCircle className="animate-spin" />
					</div>
				)}
				{ingredients != null &&
					(ingredients.totalCount != 0 ? (
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
						// No ingredients
						<div className="h-16 flex justify-center items-center">
							<p className="font-medium italic">
								{noIngredientMessage}
								{/* No ingredients yet! Add your first to begin building your
								collection. */}
							</p>
						</div>
					))}
			</section>
		</CollapsiblePanel>
	);
};

export default AllIngredients;
