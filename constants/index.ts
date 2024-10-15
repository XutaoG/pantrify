import { Recipe } from "@/types";

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
