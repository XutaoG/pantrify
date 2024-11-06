import {
	Ingredient,
	Recipe,
	RecipeIngredient,
	RecipeInstruction,
} from "@/types";

export const baseApiPath = "http://localhost:5188/api";
export const loginApiPath = "/auth/login";
export const getUserApiPath = "/auth/user";

export const navRoutes = [
	{
		icon: "/icons/dining.svg",
		route: "/",
		label: "My Recipes",
	},
	{
		icon: "/icons/grocery.svg",
		route: "/my-ingredients",
		label: "My Ingredients",
	},
	{
		icon: "/icons/skillet.svg",
		route: "/available-recipes",
		label: "Available Recipes",
	},
	{
		icon: "/icons/store.svg",
		route: "/shopping-list",
		label: "Shopping List",
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
		instruction:
			"On medium heat, fry ground beef until brown. Then remove.",
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
		instruction:
			"Once simmering, add pasta and ground beef back in, and mix. ",
		step: 4,
	},
	{
		id: 5,
		instruction: "(Optional) Add shredded cheese on top.",
		step: 5,
	},
];

export const mockAllPrimaryIngredients: Ingredient[] = [
	{
		id: 1,
		name: "Ribeye Steak",
		ingredientType: "Primary",
		isAvailable: true,
		isInCart: false,
	},
	{
		id: 2,
		name: "Eggs",
		ingredientType: "Primary",
		isAvailable: true,
		isInCart: false,
	},
	{
		id: 3,
		name: "Napa Cabbage",
		ingredientType: "Primary",
		isAvailable: true,
		isInCart: false,
	},
	{
		id: 1,
		name: "Romaine Lettuce",
		ingredientType: "Primary",
		isAvailable: true,
		isInCart: false,
	},
	{
		id: 4,
		name: "Shrimps",
		ingredientType: "Primary",
		isAvailable: true,
		isInCart: false,
	},
];

export const mockAllSecondaryIngredients: Ingredient[] = [
	{
		id: 1,
		name: "Salt",
		ingredientType: "Secondary",
		isAvailable: true,
		isInCart: false,
	},
	{
		id: 2,
		name: "Black Pepper",
		ingredientType: "Secondary",

		isAvailable: true,
		isInCart: false,
	},
	{
		id: 3,
		name: "Garlic Powder",
		ingredientType: "Secondary",

		isAvailable: true,
		isInCart: false,
	},
	{
		id: 4,
		name: "Onion Powder",
		ingredientType: "Secondary",

		isAvailable: true,
		isInCart: false,
	},
	{
		id: 5,
		name: "Mirin",
		ingredientType: "Secondary",

		isAvailable: true,
		isInCart: false,
	},
	{
		id: 6,
		name: "Sesame Oil",
		ingredientType: "Secondary",

		isAvailable: true,
		isInCart: false,
	},
	{
		id: 7,
		name: "Flour",
		ingredientType: "Secondary",

		isAvailable: true,
		isInCart: false,
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
