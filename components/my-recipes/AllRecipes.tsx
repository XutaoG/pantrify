"use client";

import { RecipeSortSchema, recipeSortSelections } from "@/constants";
import SmallRecipeCard from "../common/SmallRecipeCard";
import SearchBar from "../common/SearchBar";
import RecipeFilterDropdown from "./RecipeFilterDropdown";
import RecipeSortDropdown from "./RecipeSortDropdown";
import { useRecipes } from "@/hooks";
import { LoaderCircle } from "lucide-react";
import Pagination from "../common/Pagination";

const AllRecipes = () => {
	const pageSize = 12;

	const {
		recipes,
		searchWord,
		setSearchWord,
		setSortOption,
		isLoading,
		pageNumber,
		setPageNumber,
	} = useRecipes({ pageSize });

	const search = (searchWord: string) => {
		setSearchWord(searchWord);
	};

	const sort = (sortBy: RecipeSortSchema) => {
		setSortOption(sortBy);
	};

	// Render cards
	const recipeCards = recipes?.recipes.map((recipe) => {
		return <SmallRecipeCard recipe={recipe} key={recipe.name} />;
	});

	return (
		<section className="flex flex-col gap-4">
			<p className="font-medium">All Recipes</p>

			<div className="flex flex-col gap-4">
				{/* Search bar + filter + sort */}
				<div className="flex gap-4">
					<SearchBar placeholderText="Search for a recipe" onSearch={search} />
					<RecipeFilterDropdown />
					<RecipeSortDropdown selections={recipeSortSelections} onSort={sort} />
				</div>

				{/* Show current search word */}
				{searchWord !== "" && (
					<div className="flex justify-center items-center">
						<p className="text-sky-600">
							Searching for <span className="font-medium">{`"${searchWord}"`}</span>{" "}
							(Found {recipes?.totalCount ?? 0} result
							{recipes != null &&
								(recipes.totalCount > 1 || recipes.totalCount === 0) &&
								"s"}
							)
						</p>
					</div>
				)}

				{recipes == null && isLoading && (
					<div className="flex justify-center items-center">
						<LoaderCircle className="animate-spin" />
					</div>
				)}

				{recipes != null &&
					(recipes.totalCount != 0 ? (
						// Recipe cards
						<div className="flex flex-col gap-6">
							<div className="grid grid-cols-3 2xl:grid-cols-4 gap-6">
								{recipeCards}
							</div>
							<Pagination
								pageSize={pageSize}
								totalCount={recipes.totalCount}
								currentPageNumber={pageNumber}
								setCurrentPageNumber={setPageNumber}
							/>
						</div>
					) : (
						searchWord === "" && (
							// No recipes
							<div className="h-16 flex justify-center items-center">
								<p className="font-medium italic">No Recipe Added</p>
							</div>
						)
					))}
			</div>
		</section>
	);
};

export default AllRecipes;
