import {
	ChefHat,
	// CookingPot,
	Ham,
	ShoppingCart,
	UtensilsCrossed,
} from "lucide-react";
import { homeRoute, myIngredientRoute, shoppingListRoute } from ".";

export const navRoutes = [
	{
		icon: <UtensilsCrossed />,
		route: homeRoute,
		label: "My Recipes",
	},
	{
		icon: <Ham />,
		route: myIngredientRoute,
		label: "My Ingredients",
	},
	// {
	// 	icon: <CookingPot />,
	// 	route: "/available-recipes",
	// 	label: "Available Recipes",
	// },
	{
		icon: <ShoppingCart />,
		route: shoppingListRoute,
		label: "Shopping List",
	},
];

export const addRecipeRoute = {
	icon: <ChefHat color="white" />,
	label: "Add Recipe",
};
