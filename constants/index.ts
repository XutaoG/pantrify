export const baseApiPath = "http://localhost:5188/api";

//! Auth
export const loginApiPath = "/auth/login";
export const signUpApiPath = "/auth/sign-up";
export const logoutApiPath = "/auth/logout";
export const getUserApiPath = "/auth/user";
export const refreshApiPath = "/auth/refresh";

//! Ingredient
export const ingredientsPath = "/ingredient";
export const moveIngredientToCartPath = "/ingredient/move-to-cart";
export const moveIngredientToInventoryPath = "/ingredient/move-to-inventory";

//! Recipe
export const recipesPath = "/recipe";

export const loginRoute = "/login";
export const signUpRoute = "/sign-up";
export const homeRoute = "/home";
export const myIngredientRoute = "/my-ingredients";
export const shoppingListRoute = "/shopping-list";

export const recipeIngredientTypes = ["Primary", "Secondary", "Optional"];
export const ingredientTypes = ["Primary", "Secondary"];
export const ingredientQuantityFractions = ["None", "1/4", "1/3", "1/2", "2/3", "3/4"];

export const ingredientQuantityUnits = [
	"none",
	"tsp",
	"tbsp",
	"cup",
	"fl oz",
	"pt",
	"qt",
	"gal",
	"ml",
	"l",
	"oz",
	"lb",
	"g",
	"kg",
	"pinch",
	"dash",
	"smidgen",
	"serving",
];

export const defaultRecipeImageRoute = "/temp-recipe-images/chow-mein.jpeg";

export interface DifficultyFilterSchema {
	name: string;
	difficulty?: number;
}

export const recipeDifficultyFilters: DifficultyFilterSchema[] = [
	{
		name: "All Difficulties",
	},
	{
		name: "Easy",
		difficulty: 1,
	},
	{
		name: "Medium",
		difficulty: 2,
	},
	{
		name: "Hard",
		difficulty: 3,
	},
];

export interface DurationFilterSchema {
	name: string;
	minDuration?: number;
	maxDuration?: number;
}

export const recipeDurationFilters: DurationFilterSchema[] = [
	{
		name: "All",
	},
	{
		name: "0 to 15 mins",
		maxDuration: 900,
	},
	{
		name: "15 to 30 mins",
		minDuration: 900,
		maxDuration: 1800,
	},
	{
		name: "30 to 1 hr",
		minDuration: 1800,
		maxDuration: 3600,
	},
	{
		name: "1 to 2 hrs",
		minDuration: 3600,
		maxDuration: 7200,
	},
	{
		name: "2 hrs+",
		minDuration: 7200,
	},
];

export interface SortSchema {
	name: string;
	routeParam: string;
	isAscending: boolean;
}

export const recipeSortSelections: SortSchema[] = [
	{
		name: "Creation Date",
		routeParam: "dateAdded",
		isAscending: false,
	},
	{
		name: "Name",
		routeParam: "name",
		isAscending: true,
	},
	{
		name: "Duration",
		routeParam: "duration",
		isAscending: true,
	},
	{
		name: "Difficulty",
		routeParam: "difficulty",
		isAscending: true,
	},
];

export const ingredientSortSelections: SortSchema[] = [
	{
		name: "Creation Date",
		routeParam: "dateAdded",
		isAscending: true,
	},
	{
		name: "Expiration Date",
		routeParam: "dateExpired",
		isAscending: false,
	},
	{
		name: "Name",
		routeParam: "name",
		isAscending: true,
	},
];

export const shoppingListSortSelections: SortSchema[] = [
	{
		name: "Creation Date",
		routeParam: "dateAdded",
		isAscending: true,
	},
	{
		name: "Name",
		routeParam: "name",
		isAscending: true,
	},
];
