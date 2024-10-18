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
	},
	{
		name: "Ground beef",
		amount: "1/2 lbs",
		isAvailable: false,
	},
	{
		name: "Tomato paste",
		amount: "2 tbsp",
		isAvailable: true,
	},
	{
		name: "Heavy whipping cream",
		amount: "1 cups",
		isAvailable: true,
	},
];

export const mockRecipeSecondaryIngredients: Ingredient[] = [
	{
		name: "Salt",
		amount: "1 tsp",
		isAvailable: true,
	},
	{
		name: "Black pepper",
		amount: "1/2 tsp",
		isAvailable: true,
	},
	{
		name: "Garlic powder",
		amount: "1 tsp",
		isAvailable: true,
	},
];

export const mockRecipeOptionalIngredients: Ingredient[] = [
	{
		name: "Parmesan cheese",
		isAvailable: false,
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
	},
	{
		name: "Eggs",
		isAvailable: true,
	},
	{
		name: "Napa Cabbage",
		isAvailable: true,
	},
	{
		name: "Romaine Lettuce",
		isAvailable: true,
	},
	{
		name: "Shrimps",
		isAvailable: true,
	},
	{
		name: "Ground Beef",
		isAvailable: true,
	},
	{
		name: "Onions",
		isAvailable: true,
	},
	{
		name: "Heavy Cream",
		isAvailable: true,
	},
	{
		name: "Pasta",
		isAvailable: true,
	},
	{
		name: "Toasts",
		isAvailable: true,
	},
	{
		name: "Chicken Breasts",
		isAvailable: true,
	},
	{
		name: "Sour Cream",
		isAvailable: true,
	},
	{
		name: "Milk",
		isAvailable: true,
	},
];

export const mockAllSecondaryIngredients: Ingredient[] = [
	{
		name: "Salt",
		isAvailable: true,
	},
	{
		name: "Black Pepper",
		isAvailable: true,
	},
	{
		name: "Garlic Powder",
		isAvailable: true,
	},
	{
		name: "Onion Powder",
		isAvailable: true,
	},
	{
		name: "Mirin",
		isAvailable: true,
	},
	{
		name: "Sesame Oil",
		isAvailable: true,
	},
	{
		name: "Flour",
		isAvailable: true,
	},
	{
		name: "Cornstarch",
		isAvailable: true,
	},
	{
		name: "Butter",
		isAvailable: true,
	},
	{
		name: "Shaoxing Wine",
		isAvailable: true,
	},
	{
		name: "Soy Sauce",
		isAvailable: true,
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
