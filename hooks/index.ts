import { getAllIngredients, getAllRecipes } from "@/api";
import { SortSchema } from "@/constants";
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
	const [sortOption, setSortOption] = useState<SortSchema | null>(null);

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
	//* Search and sorting
	const [searchWord, setSearchWord] = useState("");
	const [sortOption, setSortOption] = useState<SortSchema | null>(null);

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
				sortBy: sortOption?.routeParam,
				isAscending: sortOption?.isAscending,
				pageNumber: pageNumber,
				pageSize: pageSize,
			})
		);

		setIsLoading(false);
	}, [pageNumber, searchWord, sortOption, pageSize]);

	useEffect(() => {
		// Fetch data
		fetchRecipes();
	}, [
		fetchRecipes,
		// refreshValue
	]);

	return {
		recipes,
		searchWord,
		setSearchWord,
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
