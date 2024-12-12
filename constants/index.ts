import { Recipe, RecipeIngredient, RecipeInstruction } from "@/types";

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

export interface IngredientSortSchema {
	name: string;
	routeParam: string;
	isAscending: boolean;
}

export interface RecipeSortSchema {
	name: string;
	routeParam: string;
	isAscending: boolean;
}

export const recipeSortSelections: RecipeSortSchema[] = [
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

export const ingredientSortSelections: IngredientSortSchema[] = [
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

export const shoppingListSortSelections: IngredientSortSchema[] = [
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

export const mockRecipes1: Recipe[] = [
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

export const mockRecipes2: Recipe[] = [
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

export const mockRecipePrimaryIngredients: RecipeIngredient[] = [
	{
		id: 1,
		name: "Spaghetti",
		ingredientType: "Primary",
		quantity: 2,
		quantityUnit: "servings",
		isAvailable: true,
	},
	{
		id: 2,
		name: "Ground beef",
		ingredientType: "Primary",
		quantity: 0.5,
		quantityUnit: "lbs",
		isAvailable: false,
	},
	{
		id: 3,
		name: "Tomato paste",
		ingredientType: "Primary",
		quantity: 2,
		quantityUnit: "tbsp",
		isAvailable: true,
	},
	{
		id: 4,
		name: "Heavy whipping cream",
		ingredientType: "Primary",
		quantity: 1,
		quantityUnit: "cups",
		isAvailable: true,
	},
];

export const mockRecipeSecondaryIngredients: RecipeIngredient[] = [
	{
		id: 1,
		name: "Salt",
		ingredientType: "Secondary",
		quantity: 1,
		quantityUnit: "tsp",
		isAvailable: true,
	},
	{
		id: 2,
		name: "Black pepper",
		ingredientType: "Secondary",
		quantity: 0.5,
		quantityUnit: "tsp",
		isAvailable: true,
	},
	{
		id: 3,
		name: "Garlic powder",
		ingredientType: "Secondary",
		quantity: 1,
		quantityUnit: "tsp",
		isAvailable: true,
	},
];

export const mockRecipeOptionalIngredients: RecipeIngredient[] = [
	{
		id: 1,
		name: "Parmesan cheese",
		isAvailable: false,
		ingredientType: "Optional",
	},
];

export const mockInstructions: RecipeInstruction[] = [
	{
		id: 1,
		instruction: "Boil water and add salt and pasta. Strain after.",
		step: 1,
	},
	{
		id: 2,
		instruction: "On medium heat, fry ground beef until brown. Then remove.",
		step: 2,
	},
	{
		id: 3,
		instruction:
			"On medium heat, add tomato paste, heavy whipping cream, salt, black pepper, and garlic powder.",
		step: 3,
	},
	{
		id: 4,
		instruction: "Once simmering, add pasta and ground beef back in, and mix. ",
		step: 4,
	},
	{
		id: 5,
		instruction: "(Optional) Add shredded cheese on top.",
		step: 5,
	},
];

export const mockEggRecipes: Recipe[] = [
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
