import {
	ChefHat,
	// CookingPot,
	Ham,
	ShoppingCart,
	UtensilsCrossed,
} from "lucide-react";

export const navRoutes = [
	{
		icon: <UtensilsCrossed />,
		route: "/",
		label: "My Recipes",
	},
	{
		icon: <Ham />,
		route: "/my-ingredients",
		label: "My Ingredients",
	},
	// {
	// 	icon: <CookingPot />,
	// 	route: "/available-recipes",
	// 	label: "Available Recipes",
	// },
	{
		icon: <ShoppingCart />,
		route: "/shopping-list",
		label: "Shopping List",
	},
];

export const addRecipeRoute = {
	icon: <ChefHat color="white" />,
	label: "Add Recipe",
};
