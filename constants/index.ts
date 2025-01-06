import { Recipe } from "@/types";

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

export const mockAllIngredientsRecipes: Recipe[] = [
	{
		id: 4,
		name: "Grilled cheese Sandwich",
		duration: 600,
		difficulty: 1,
		numServings: 1,
		ingredients: [],
		instructions: [],
		dateAdded: new Date(),
		dateModified: new Date(),
		images: [
			{
				id: 1,
				path: "/temp-recipe-images/grilled-cheese-sandwich.webp",
				order: 1,
			},
		],
	},
	{
		id: 6,
		name: "Shrimp Dumplings",
		duration: 900,
		difficulty: 1,
		numServings: 1,
		ingredients: [],
		instructions: [],
		dateAdded: new Date(),
		dateModified: new Date(),
		images: [
			{
				id: 1,
				path: "/temp-recipe-images/shrimp-dumpling.webp",
				order: 1,
			},
		],
	},
];

export const mockSomeIngredientsRecipes: Recipe[] = [
	{
		id: 1,
		name: "Fried Rice",
		duration: 1800,
		difficulty: 2,
		numServings: 1,
		ingredients: [],
		instructions: [],
		dateAdded: new Date(),
		dateModified: new Date(),
		images: [
			{
				id: 1,
				path: "/temp-recipe-images/fried-rice.webp",
				order: 1,
			},
		],
	},
	{
		id: 2,
		name: "Egg Drop Soup",
		duration: 900,
		difficulty: 1,
		numServings: 1,
		ingredients: [],
		instructions: [],
		dateAdded: new Date(),
		dateModified: new Date(),
		images: [
			{
				id: 1,
				path: "/temp-recipe-images/egg-drop-soup.jpg",
				order: 1,
			},
		],
	},
	{
		id: 3,
		name: "Ground Beef Spaghetti",
		duration: 1800,
		difficulty: 2,
		numServings: 1,
		ingredients: [],
		instructions: [],
		dateAdded: new Date(),
		dateModified: new Date(),
		images: [
			{
				id: 1,
				path: "/temp-recipe-images/spaghetti.jpg",
				order: 1,
			},
		],
	},
];

export const mockMissingIngredientsRecipes: Recipe[] = [
	{
		id: 5,
		name: "Chow Mein",
		duration: 900,
		difficulty: 1,
		numServings: 1,
		ingredients: [],
		instructions: [],
		dateAdded: new Date(),
		dateModified: new Date(),
		images: [
			{
				id: 1,
				path: "/temp-recipe-images/chow-mein.jpeg",
				order: 1,
			},
		],
	},
];
