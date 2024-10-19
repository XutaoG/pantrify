import { Ingredient, Recipe } from "@/types";

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
		imageUrl: "/temp-recipe-images/fried-rice.webp",
		name: "Fried Rice",
		time: "30m",
		difficulty: "Medium",
		numIngredients: 7,
	},
	{
		imageUrl: "/temp-recipe-images/egg-drop-soup.jpg",
		name: "Egg Drop Soup",
		time: "15m",
		difficulty: "Easy",
		numIngredients: 4,
	},
	{
		imageUrl: "/temp-recipe-images/spaghetti.jpg",
		name: "Ground Beef Spaghetti",
		time: "30m",
		difficulty: "Medium",
		numIngredients: 5,
	},
];

export const mockRecipes2: Recipe[] = [
	{
		imageUrl: "/temp-recipe-images/fried-rice.webp",
		name: "Fried Rice",
		time: "30m",
		difficulty: "Medium",
		numIngredients: 7,
	},
	{
		imageUrl: "/temp-recipe-images/egg-drop-soup.jpg",
		name: "Egg Drop Soup",
		time: "15m",
		difficulty: "Easy",
		numIngredients: 4,
	},
	{
		imageUrl: "/temp-recipe-images/spaghetti.jpg",
		name: "Ground Beef Spaghetti",
		time: "30m",
		difficulty: "Medium",
		numIngredients: 5,
	},
	{
		imageUrl: "/temp-recipe-images/grilled-cheese-sandwich.webp",
		name: "Grilled cheese Sandwich",
		time: "10m",
		difficulty: "Easy",
		numIngredients: 7,
	},
	{
		imageUrl: "/temp-recipe-images/chow-mein.jpeg",
		name: "Chow Mein",
		time: "15m",
		difficulty: "Easy",
		numIngredients: 4,
	},
	{
		imageUrl: "/temp-recipe-images/shrimp-dumpling.webp",
		name: "Shrimp Dumplings",
		time: "15m",
		difficulty: "Easy",
		numIngredients: 5,
	},
];

export const mockRecipePrimaryIngredients: Ingredient[] = [
	{
		name: "Spaghetti",
		amount: "2 servings",
		isAvailable: true,
		isInCart: false,
	},
	{
		name: "Ground beef",
		amount: "1/2 lbs",
		isAvailable: false,
		isInCart: false,
	},
	{
		name: "Tomato paste",
		amount: "2 tbsp",
		isAvailable: true,
		isInCart: false,
	},
	{
		name: "Heavy whipping cream",
		amount: "1 cups",
		isAvailable: true,
		isInCart: false,
	},
];

export const mockRecipeSecondaryIngredients: Ingredient[] = [
	{
		name: "Salt",
		amount: "1 tsp",
		isAvailable: true,
		isInCart: false,
	},
	{
		name: "Black pepper",
		amount: "1/2 tsp",
		isAvailable: true,
		isInCart: false,
	},
	{
		name: "Garlic powder",
		amount: "1 tsp",
		isAvailable: true,
		isInCart: false,
	},
];

export const mockRecipeOptionalIngredients: Ingredient[] = [
	{
		name: "Parmesan cheese",
		isAvailable: false,
		isInCart: false,
	},
];

export const mockInstructions: string[] = [
	"Boil water and add salt and pasta. Strain after.",
	"On medium heat, fry ground beef until brown. Then remove.",
	"On medium heat, add tomato paste, heavy whipping cream, salt, black pepper, and garlic powder.",
	"Once simmering, add pasta and ground beef back in, and mix. ",
	"(Optional) Add shredded cheese on top.",
];

export const mockAllPrimaryIngredients: Ingredient[] = [
	{
		name: "Ribeye Steak",
		isAvailable: true,
		isInCart: false,
	},
	{
		name: "Eggs",
		isAvailable: true,
		isInCart: false,
	},
	{
		name: "Napa Cabbage",
		isAvailable: true,
		isInCart: false,
	},
	{
		name: "Romaine Lettuce",
		isAvailable: true,
		isInCart: false,
	},
	{
		name: "Shrimps",
		isAvailable: true,
		isInCart: false,
	},
	{
		name: "Ground Beef",
		isAvailable: true,
		isInCart: false,
	},
	{
		name: "Onions",
		isAvailable: true,
		isInCart: false,
	},
	{
		name: "Heavy Cream",
		isAvailable: true,
		isInCart: false,
	},
	{
		name: "Pasta",
		isAvailable: true,
		isInCart: false,
	},
	{
		name: "Toasts",
		isAvailable: true,
		isInCart: false,
	},
	{
		name: "Chicken Breasts",
		isAvailable: true,
		isInCart: false,
	},
	{
		name: "Sour Cream",
		isAvailable: true,
		isInCart: false,
	},
	{
		name: "Milk",
		isAvailable: true,
		isInCart: false,
	},
];

export const mockAllSecondaryIngredients: Ingredient[] = [
	{
		name: "Salt",
		isAvailable: true,
		isInCart: false,
	},
	{
		name: "Black Pepper",
		isAvailable: true,
		isInCart: false,
	},
	{
		name: "Garlic Powder",
		isAvailable: true,
		isInCart: false,
	},
	{
		name: "Onion Powder",
		isAvailable: true,
		isInCart: false,
	},
	{
		name: "Mirin",
		isAvailable: true,
		isInCart: false,
	},
	{
		name: "Sesame Oil",
		isAvailable: true,
		isInCart: false,
	},
	{
		name: "Flour",
		isAvailable: true,
		isInCart: false,
	},
	{
		name: "Cornstarch",
		isAvailable: true,
		isInCart: false,
	},
	{
		name: "Butter",
		isAvailable: true,
		isInCart: false,
	},
	{
		name: "Shaoxing Wine",
		isAvailable: true,
		isInCart: false,
	},
	{
		name: "Soy Sauce",
		isAvailable: true,
		isInCart: false,
	},
];

export const mockEggRecipes: Recipe[] = [
	{
		imageUrl: "/temp-recipe-images/fried-rice.webp",
		name: "Fried Rice",
		time: "30m",
		difficulty: "Medium",
		numIngredients: 7,
	},
	{
		imageUrl: "/temp-recipe-images/egg-drop-soup.jpg",
		name: "Egg Drop Soup",
		time: "15m",
		difficulty: "Easy",
		numIngredients: 4,
	},
];

export const mockAllIngredientsRecipes: Recipe[] = [
	{
		imageUrl: "/temp-recipe-images/grilled-cheese-sandwich.webp",
		name: "Grilled cheese Sandwich",
		time: "10m",
		difficulty: "Easy",
		numIngredients: 7,
	},
	{
		imageUrl: "/temp-recipe-images/shrimp-dumpling.webp",
		name: "Shrimp Dumplings",
		time: "15m",
		difficulty: "Easy",
		numIngredients: 5,
	},
];

export const mockSomeIngredientsRecipes: Recipe[] = [
	{
		imageUrl: "/temp-recipe-images/fried-rice.webp",
		name: "Fried Rice",
		time: "30m",
		difficulty: "Medium",
		numIngredients: 7,
	},
	{
		imageUrl: "/temp-recipe-images/egg-drop-soup.jpg",
		name: "Egg Drop Soup",
		time: "15m",
		difficulty: "Easy",
		numIngredients: 4,
	},
	{
		imageUrl: "/temp-recipe-images/spaghetti.jpg",
		name: "Ground Beef Spaghetti",
		time: "30m",
		difficulty: "Medium",
		numIngredients: 5,
	},
];

export const mockMissingIngredientsRecipes: Recipe[] = [
	{
		imageUrl: "/temp-recipe-images/chow-mein.jpeg",
		name: "Chow Mein",
		time: "15m",
		difficulty: "Easy",
		numIngredients: 4,
	},
];
