"use client";

import { getAllIngredients } from "@/api";
import { FetchContext } from "@/components/common/FetchContext";
import PageTitle from "@/components/common/PageTitle";
import SearchBar from "@/components/common/SearchBar";
import IngredientSortDropdown from "@/components/my-ingredients/IngredientSortDropdown";
import AddShoppingListcontroller from "@/components/shopping-list/AddShoppingListController";
import AllPrimaryShoppingIngredients from "@/components/shopping-list/AllPrimaryShoppingIngredients";
import AllSecondaryShoppingIngredients from "@/components/shopping-list/AllSecondaryShoppingIngredients";
import { IngredientSortSchema, shoppingListSortSelections } from "@/constants";
import { IngredientList } from "@/types";
import { LoaderCircle } from "lucide-react";
import React, { Fragment, useCallback, useEffect, useState } from "react";

const ShoppingList = () => {
	//* Search and sorting
	const [currentSearchWord, setCurrentSearchWord] = useState("");
	const [currentSortOption, setCurrentSortOptions] = useState<IngredientSortSchema | null>(null);

	//* Data retrieving
	const [primaryIngredients, setPrimaryIngredients] = useState<IngredientList | null>(null);
	const [secondaryIngredients, setSecondaryIngredients] = useState<IngredientList | null>(null);
	const [isLoading, setIsLoading] = useState(true);

	const fetchIngredients = useCallback(async () => {
		setIsLoading(true);

		//* Retrieve primary ingredients
		setPrimaryIngredients(
			await getAllIngredients({
				name: currentSearchWord,
				ingredientType: "Primary",
				isInCart: true,
				sortBy: currentSortOption?.routeParam,
				isAscending: currentSortOption?.isAscending,
			})
		);

		//* Retrieve secondary ingredients
		setSecondaryIngredients(
			await getAllIngredients({
				name: currentSearchWord,
				ingredientType: "Secondary",
				isInCart: true,
				sortBy: currentSortOption?.routeParam,
				isAscending: currentSortOption?.isAscending,
			})
		);

		setIsLoading(false);
	}, [currentSearchWord, currentSortOption]);

	useEffect(() => {
		// Fetch data
		fetchIngredients();
	}, [fetchIngredients]);

	const search = (searchWord: string) => {
		setCurrentSearchWord(searchWord);
	};

	const sort = (sortBy: IngredientSortSchema) => {
		console.log(sortBy.isAscending);
		setCurrentSortOptions(sortBy);
	};

	return (
		<FetchContext.Provider value={fetchIngredients}>
			<div className="grow flex flex-col gap-6 px-5 pt-10 pb-5 overflow-y-auto">
				{/* Page title */}
				<PageTitle title="Shopping List" subtitle="Everything You Need, All in One Page." />

				<AddShoppingListcontroller />

				{/* All shopping ingredients */}
				<section className="flex flex-col gap-6">
					<div className="flex gap-4">
						<SearchBar placeholderText="Search for a ingredient" onSearch={search} />
						<IngredientSortDropdown
							selections={shoppingListSortSelections}
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
							<AllPrimaryShoppingIngredients ingredients={primaryIngredients} />
							<AllSecondaryShoppingIngredients ingredients={secondaryIngredients} />
						</Fragment>
					)}
				</section>
			</div>
		</FetchContext.Provider>
	);
};

export default ShoppingList;
