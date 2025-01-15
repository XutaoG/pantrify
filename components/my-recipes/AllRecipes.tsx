"use client";

import { recipeSortSelections, SortSchema } from "@/constants";
import SmallRecipeCard from "../common/SmallRecipeCard";
import SearchBar from "../common/SearchBar";
import RecipeFilterDropdown from "./RecipeFilterDropdown";
import { useRecipes } from "@/hooks";
import { LoaderCircle } from "lucide-react";
import Pagination from "../common/Pagination";
import SortDropdown from "../common/SortDropdown";
import { getPluralEnding } from "@/utils";
import { RefreshContext } from "../common/FetchContext";
import { useContext } from "react";

const AllRecipes = () => {
	//* refreshValue: passed to useRecipe dependency array to retrieve ingredients
	const { refreshValue } = useContext(RefreshContext)!;

	//* Action display

	const pageSize = 12;

	const {
		recipes: recipeList,
		searchWord,
		setSearchWord,
		difficultyFilterOption,
		setDifficultyFilterOption,
		durationFilterOption,
		setDurationFilterOption,
		setSortOption,
		isLoading,
		pageNumber,
		setPageNumber,
	} = useRecipes({ pageSize, refreshValue });

	const search = (searchWord: string) => {
		setSearchWord(searchWord);
	};

	const sort = (sortBy: SortSchema) => {
		setSortOption(sortBy);
	};

	// Render cards
	const recipeCards = recipeList?.recipes.map((recipe) => {
		return <SmallRecipeCard recipe={recipe} key={recipe.id} />;
	});

	return (
		<section className="flex flex-col gap-2 sm:gap-4">
			<p className="font-medium">All Recipes</p>

			<div className="flex flex-col gap-3 sm:gap-4">
				{/* Search bar + filter + sort */}
				<div className="flex items-center gap-2 sm:gap-4">
					<SearchBar placeholderText="Search for a recipe" onSearch={search} />
					<RecipeFilterDropdown
						onDifficultyFilterChange={setDifficultyFilterOption}
						onDurationFilterChange={setDurationFilterOption}
					/>
					<SortDropdown selections={recipeSortSelections} onSort={sort} />
				</div>

				{/* Show current search word */}
				{searchWord !== "" && (
					<div className="flex justify-center items-center">
						<p className="text-sky-600">
							Searching for <span className="font-medium">{`"${searchWord}"`}</span>{" "}
						</p>
					</div>
				)}

				{/* Show filter */}
				{(difficultyFilterOption.difficulty != null ||
					durationFilterOption.maxDuration != null ||
					durationFilterOption.minDuration != null) && (
					<div className="flex justify-center items-center gap-6">
						{difficultyFilterOption.difficulty != null && (
							<p className="text-sky-600">
								Filtered by difficulty:{" "}
								<span className="font-medium">{difficultyFilterOption.name}</span>
							</p>
						)}
						{(durationFilterOption.maxDuration != null ||
							durationFilterOption.minDuration != null) && (
							<p className="text-sky-600">
								Filtered by Duration:{" "}
								<span className="font-medium">{durationFilterOption.name}</span>
							</p>
						)}
					</div>
				)}

				{/* Number of recipes found */}
				{(searchWord !== "" ||
					difficultyFilterOption.difficulty != null ||
					durationFilterOption.maxDuration != null ||
					durationFilterOption.minDuration != null) && (
					<p className="font-medium self-center">
						Found {recipeList?.totalCount ?? 0} result
						{getPluralEnding(recipeList?.totalCount ?? 0)}
					</p>
				)}

				{(recipeList == null || isLoading) && (
					<div className="flex justify-center items-center">
						<LoaderCircle className="animate-spin" />
					</div>
				)}

				{recipeList != null &&
					(recipeList.totalCount !== 0 ? (
						// Recipe cards
						<div className="flex flex-col gap-4 sm:gap-6">
							<div
								className="grid grid-cols-1 custom-sm:grid-cols-2 custom-md:grid-cols-3
								lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-2 sm:gap-4 xl:gap-6
								custom-3xl:grid-cols-5 custom-4xl:grid-cols-6 custom-5xl:grid-cols-7"
							>
								{recipeCards}
							</div>
							<Pagination
								pageSize={pageSize}
								totalCount={recipeList.totalCount}
								currentPageNumber={pageNumber}
								setCurrentPageNumber={setPageNumber}
							/>
						</div>
					) : (
						searchWord === "" &&
						difficultyFilterOption.difficulty == null &&
						durationFilterOption.minDuration == null &&
						durationFilterOption.maxDuration == null && (
							// No recipes
							<div className="h-16 flex justify-center items-center">
								<p className="font-medium italic">
									No recipes yet! Add your first to begin building your
									collection.
								</p>
							</div>
						)
					))}
			</div>
		</section>
	);
};

export default AllRecipes;
