import { getAllIngredients, getAllRecipes } from "@/api";
import {
	DifficultyFilterSchema,
	DurationFilterSchema,
	ingredientSortSelections,
	recipeDifficultyFilters,
	recipeDurationFilters,
	recipeSortSelections,
	SortSchema,
} from "@/constants";
import { IngredientList, RecipeList } from "@/types";
import { useCallback, useEffect, useRef, useState } from "react";

export const useDropdown = <T extends HTMLElement>() => {
	const [isExpanded, setIsExpanded] = useState(false);
	const containerRef = useRef<T>(null);

	useEffect(() => {
		const handleClickOutside = (event: MouseEvent) => {
			if (!containerRef.current) {
				return;
			}

			if (!containerRef.current.contains(event.target as Node)) {
				setIsExpanded(false);
			}
		};

		document.addEventListener("click", handleClickOutside);

		return () => {
			document.removeEventListener("click", handleClickOutside);
		};
	}, []);

	const onToggle = () => {
		setIsExpanded((val) => !val);
	};

	return [containerRef, isExpanded, onToggle] as const;
};

export const useIngredients = ({
	pageSize,
	ingredientType,
	isAvailable,
	isInCart,
	refreshValue,
}: {
	pageSize: number;
	ingredientType: "Primary" | "Secondary";
	isAvailable?: boolean;
	isInCart?: boolean;
	refreshValue: boolean;
}) => {
	//* Search and sorting
	const [searchWord, setSearchWord] = useState("");
	const [sortOption, setSortOption] = useState<SortSchema>(ingredientSortSelections[0]);

	//* Data retrieving
	const [ingredients, setIngredients] = useState<IngredientList | null>(null);
	const [isLoading, setIsLoading] = useState(true);

	const [pageNumber, setPageNumber] = useState(1);

	//* Fetch data
	const fetchIngredients = useCallback(async () => {
		setIsLoading(true);

		setIngredients(
			await getAllIngredients({
				name: searchWord,
				ingredientType,
				isAvailable,
				isInCart,
				sortBy: sortOption?.routeParam,
				isAscending: sortOption?.isAscending,
				pageNumber: pageNumber,
				pageSize: pageSize,
			})
		);

		setIsLoading(false);
	}, [ingredientType, isAvailable, isInCart, pageNumber, searchWord, sortOption, pageSize]);

	useEffect(() => {
		// Fetch data
		fetchIngredients();
	}, [fetchIngredients, refreshValue]);

	return {
		ingredients,
		searchWord,
		setSearchWord,
		sortOption,
		setSortOption,
		isLoading,
		pageNumber,
		setPageNumber,
	};
};

export const useRecipes = ({
	pageSize,
}: // refreshValue,
{
	pageSize: number;
	// refreshValue: boolean;
}) => {
	//* Search, filtering, and sorting
	const [searchWord, setSearchWord] = useState("");
	const [sortOption, setSortOption] = useState<SortSchema>(recipeSortSelections[0]);

	const [difficultyFilterOption, setDifficultyFilterOption] = useState<DifficultyFilterSchema>(
		recipeDifficultyFilters[0]
	);
	const [durationFilterOption, setDurationFilterOption] = useState<DurationFilterSchema>(
		recipeDurationFilters[0]
	);

	//* Data retrieving
	const [recipes, setRecipes] = useState<RecipeList | null>(null);
	const [isLoading, setIsLoading] = useState(true);

	const [pageNumber, setPageNumber] = useState(1);

	//* Fetch data
	const fetchRecipes = useCallback(async () => {
		setIsLoading(true);

		setRecipes(
			await getAllRecipes({
				name: searchWord,
				difficulty: difficultyFilterOption.difficulty,
				minDuration: durationFilterOption.minDuration,
				maxDuration: durationFilterOption.maxDuration,
				sortBy: sortOption?.routeParam,
				isAscending: sortOption?.isAscending,
				pageNumber: pageNumber,
				pageSize: pageSize,
			})
		);

		setIsLoading(false);
	}, [
		searchWord,
		difficultyFilterOption,
		durationFilterOption,
		sortOption,
		pageNumber,
		pageSize,
	]);

	useEffect(() => {
		// Fetch data
		fetchRecipes();
	}, [
		fetchRecipes,
		// refreshValue
	]);

	// Set page to 1 when filter is changed
	useEffect(() => {
		setPageNumber(1);
	}, [difficultyFilterOption, durationFilterOption]);

	return {
		recipes,
		searchWord,
		setSearchWord,
		difficultyFilterOption,
		setDifficultyFilterOption,
		durationFilterOption,
		setDurationFilterOption,
		sortOption,
		setSortOption,
		isLoading,
		pageNumber,
		setPageNumber,
	};
};

export const useRefresh = () => {
	//* refreshValue: passed to useIngredients dependency array to retrieve ingredients
	const [refreshValue, setRefreshValue] = useState(false);

	//* refresh: called when ingredients are updated and need to be reloaded
	const refresh = () => {
		setRefreshValue((val) => !val);
	};

	return [refreshValue, refresh] as const;
};
