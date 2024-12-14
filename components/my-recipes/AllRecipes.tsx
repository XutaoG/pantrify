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

const AllRecipes = () => {
	const pageSize = 12;

	const {
		recipes,
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
	} = useRecipes({ pageSize });

	const search = (searchWord: string) => {
		setSearchWord(searchWord);
	};

	const sort = (sortBy: SortSchema) => {
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
						Found {recipes?.totalCount ?? 0} result
						{getPluralEnding(recipes?.totalCount ?? 0)}
					</p>
				)}

				{(recipes == null || isLoading) && (
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
						searchWord === "" &&
						difficultyFilterOption.difficulty != null &&
						durationFilterOption.minDuration != null &&
						durationFilterOption.maxDuration != null && (
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
