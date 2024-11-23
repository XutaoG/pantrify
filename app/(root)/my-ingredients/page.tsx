"use client";

import { getAllIngredients } from "@/api";
import { FetchContext } from "@/components/common/FetchContext";
import PageTitle from "@/components/common/PageTitle";
import SearchBar from "@/components/common/SearchBar";
import AddIngredientController from "@/components/my-ingredients/AddIngredientController";
import AllPrimaryIngredients from "@/components/my-ingredients/AllPrimaryIngredients";
import AllSecondaryIngredients from "@/components/my-ingredients/AllSecondaryIngredients";
import IngredientSortDropdown from "@/components/my-ingredients/IngredientSortDropdown";
import { IngredientSortSchema, ingredientSortSelections } from "@/constants";
import { IngredientList } from "@/types";
import { LoaderCircle } from "lucide-react";
import { Fragment, useCallback, useEffect, useState } from "react";

const MyIngredients = () => {
	//* Search and sorting
	const [currentSearchWord, setCurrentSearchWord] = useState("");
	const [currentSortOption, setCurrentSortOptions] = useState<IngredientSortSchema | null>(null);

	//* Data retrieving
	const [primaryIngredients, setPrimaryIngredients] = useState<IngredientList | null>(null);
	const [secondaryIngredients, setSecondaryIngredients] = useState<IngredientList | null>(null);
	const [isLoading, setIsLoading] = useState(true);

	const [currentPrimaryIngredientsPageNumber, setCurrentPrimaryIngredientsPageNumber] =
		useState(1);

	const [currentSecondaryIngredientsPageNumber, setCurrentSecondaryIngredientsPageNumber] =
		useState(1);

	const pageSize = 12;

	//* Fetch data
	const fetchIngredients = useCallback(async () => {
		setIsLoading(true);

		//* Retrieve primary ingredients
		setPrimaryIngredients(
			await getAllIngredients({
				name: currentSearchWord,
				ingredientType: "Primary",
				isAvailable: true,
				sortBy: currentSortOption?.routeParam,
				isAscending: currentSortOption?.isAscending,
				pageNumber: currentPrimaryIngredientsPageNumber,
				pageSize: pageSize,
			})
		);

		//* Retrieve secondary ingredients
		setSecondaryIngredients(
			await getAllIngredients({
				name: currentSearchWord,
				ingredientType: "Secondary",
				isAvailable: true,
				sortBy: currentSortOption?.routeParam,
				isAscending: currentSortOption?.isAscending,
				pageNumber: currentSecondaryIngredientsPageNumber,
				pageSize: pageSize,
			})
		);

		setIsLoading(false);
	}, [
		currentSearchWord,
		currentSortOption,
		currentPrimaryIngredientsPageNumber,
		currentSecondaryIngredientsPageNumber,
	]);

	useEffect(() => {
		// Fetch data
		fetchIngredients();
	}, [fetchIngredients]);

	const search = (searchWord: string) => {
		setCurrentSearchWord(searchWord);
	};

	const sort = (sortBy: IngredientSortSchema) => {
		setCurrentSortOptions(sortBy);
	};

	return (
		<FetchContext.Provider value={fetchIngredients}>
			<div className="grow flex flex-col gap-6 px-5 pt-10 pb-5 overflow-y-auto">
				{/* Page title */}
				<PageTitle
					title="My Ingredients"
					subtitle="Organize, Manage, and Create with What You Have."
				/>

				<AddIngredientController />

				{/* All ingredients */}
				<section className="flex flex-col gap-6">
					<div className="flex gap-4">
						<SearchBar placeholderText="Search for a ingredient" onSearch={search} />
						<IngredientSortDropdown
							selections={ingredientSortSelections}
							onSort={sort}
						/>
					</div>

					{/* Show current search word */}
					{currentSearchWord !== "" && (
						<div className="flex justify-center items-center">
							<p className="text-sky-600">
								Searching for{" "}
								<span className="font-medium">{`"${currentSearchWord}"`}</span>
							</p>
						</div>
					)}

					{/* All ingredients */}
					{isLoading || primaryIngredients == null || secondaryIngredients == null ? (
						<div className="flex justify-center items-center">
							<LoaderCircle className="animate-spin" />
						</div>
					) : (
						<Fragment>
							<AllPrimaryIngredients
								ingredients={primaryIngredients}
								pageSize={pageSize}
								currentPageNumber={currentPrimaryIngredientsPageNumber}
								setCurrentPageNumber={setCurrentPrimaryIngredientsPageNumber}
							/>
							<AllSecondaryIngredients
								ingredients={secondaryIngredients}
								pageSize={pageSize}
								currentPageNumber={currentSecondaryIngredientsPageNumber}
								setCurrentPageNumber={setCurrentSecondaryIngredientsPageNumber}
							/>
						</Fragment>
					)}
				</section>
			</div>
		</FetchContext.Provider>
	);
};

export default MyIngredients;
